import { Achievement } from '../models/Achievement.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js'

export async function getAchievements(req, res) {
  try {
    const achievements = await Achievement.find({ status: 'published' }).sort({ displayOrder: 1, createdAt: -1 })
    res.json({ success: true, data: achievements })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAllAchievementsAdmin(req, res) {
  try {
    const achievements = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 })
    res.json({ success: true, data: achievements })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function createAchievement(req, res) {
  try {
    const { title, organization, description, date, credentialUrl, status, displayOrder } = req.body

    let imageUrl = null
    let publicId = null

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/achievements')
      imageUrl = uploadRes.url
      publicId = uploadRes.publicId
    }

    const achievement = await Achievement.create({
      title,
      organization,
      description,
      date,
      credentialUrl,
      image: imageUrl ? { url: imageUrl, publicId } : undefined,
      status: status || 'published',
      displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    })

    res.status(201).json({ success: true, data: achievement })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function updateAchievement(req, res) {
  try {
    const { id } = req.params
    const ach = await Achievement.findById(id)
    if (!ach) {
      return res.status(404).json({ success: false, message: 'Achievement not found' })
    }

    const { title, organization, description, date, credentialUrl, status, displayOrder } = req.body

    if (title) ach.title = title
    if (organization) ach.organization = organization
    if (description) ach.description = description
    if (date) ach.date = date
    if (credentialUrl !== undefined) ach.credentialUrl = credentialUrl
    if (status) ach.status = status
    if (displayOrder !== undefined) ach.displayOrder = parseInt(displayOrder)

    if (req.file) {
      if (ach.image && ach.image.publicId) {
        await deleteFromCloudinary(ach.image.publicId)
      }
      const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/achievements')
      ach.image = { url: uploadRes.url, publicId: uploadRes.publicId }
    }

    await ach.save()
    res.json({ success: true, data: ach })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function deleteAchievement(req, res) {
  try {
    const { id } = req.params
    const ach = await Achievement.findById(id)
    if (!ach) {
      return res.status(404).json({ success: false, message: 'Achievement not found' })
    }

    if (ach.image && ach.image.publicId) {
      await deleteFromCloudinary(ach.image.publicId)
    }

    await Achievement.findByIdAndDelete(id)
    res.json({ success: true, message: 'Achievement deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
