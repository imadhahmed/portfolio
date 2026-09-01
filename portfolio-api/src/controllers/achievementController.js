import { Achievement } from '../models/Achievement.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js'
import { apiCache } from '../utils/cache.js'

const CACHE_KEY_ACHIEVEMENTS_PUBLIC = 'achievements:published'
const CACHE_KEY_CERTIFICATES_PUBLIC = 'certificates:published'

export async function getAchievements(req, res) {
  try {
    const cached = apiCache.get(CACHE_KEY_ACHIEVEMENTS_PUBLIC)
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
      return res.json(cached)
    }

    const achievements = await Achievement.find({ status: 'published' })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean()

    const payload = { success: true, data: achievements }
    apiCache.set(CACHE_KEY_ACHIEVEMENTS_PUBLIC, payload)

    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    res.json(payload)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAllAchievementsAdmin(req, res) {
  try {
    const achievements = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 }).lean()
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
      try {
        const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/achievements')
        imageUrl = uploadRes.url
        publicId = uploadRes.publicId
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Achievement image upload failed:', uploadErr.message)
      }
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

    apiCache.del(CACHE_KEY_ACHIEVEMENTS_PUBLIC)
    apiCache.del(CACHE_KEY_CERTIFICATES_PUBLIC)
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
      try {
        if (ach.image && ach.image.publicId) {
          await deleteFromCloudinary(ach.image.publicId)
        }
        const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/achievements')
        ach.image = { url: uploadRes.url, publicId: uploadRes.publicId }
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Update achievement image failed:', uploadErr.message)
      }
    }

    await ach.save()
    apiCache.del(CACHE_KEY_ACHIEVEMENTS_PUBLIC)
    apiCache.del(CACHE_KEY_CERTIFICATES_PUBLIC)
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
    apiCache.del(CACHE_KEY_ACHIEVEMENTS_PUBLIC)
    apiCache.del(CACHE_KEY_CERTIFICATES_PUBLIC)
    res.json({ success: true, message: 'Achievement deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
