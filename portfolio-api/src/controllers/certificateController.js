import { Certificate } from '../models/Certificate.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js'

export async function getCertificates(req, res) {
  try {
    const certificates = await Certificate.find({ status: 'published' }).sort({ displayOrder: 1, createdAt: -1 })
    res.json({ success: true, data: certificates })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAllCertificatesAdmin(req, res) {
  try {
    const certificates = await Certificate.find().sort({ displayOrder: 1, createdAt: -1 })
    res.json({ success: true, data: certificates })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function createCertificate(req, res) {
  try {
    const { title, issuer, category, description, credentialUrl, tags, color, status, displayOrder, issueDate } = req.body

    let imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
    let publicId = null

    if (req.file) {
      try {
        const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/certificates')
        imageUrl = uploadRes.url
        publicId = uploadRes.publicId
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Certificate image upload failed, using default image:', uploadErr.message)
      }
    }

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : (tags || [])

    const certificate = await Certificate.create({
      title,
      category: category || 'Certification',
      issuer,
      description,
      tags: parsedTags,
      credentialUrl,
      image: { url: imageUrl, publicId },
      issueDate,
      color: color || '#00df8f',
      status: status || 'published',
      displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    })

    res.status(201).json({ success: true, data: certificate })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function updateCertificate(req, res) {
  try {
    const { id } = req.params
    const cert = await Certificate.findById(id)
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' })
    }

    const { title, issuer, category, description, credentialUrl, tags, color, status, displayOrder, issueDate } = req.body

    if (title) cert.title = title
    if (issuer) cert.issuer = issuer
    if (category) cert.category = category
    if (description) cert.description = description
    if (credentialUrl !== undefined) cert.credentialUrl = credentialUrl
    if (color) cert.color = color
    if (status) cert.status = status
    if (issueDate) cert.issueDate = issueDate
    if (displayOrder !== undefined) cert.displayOrder = parseInt(displayOrder)
    if (tags) {
      cert.tags = typeof tags === 'string' ? JSON.parse(tags) : tags
    }

    if (req.file) {
      try {
        if (cert.image && cert.image.publicId) {
          await deleteFromCloudinary(cert.image.publicId)
        }
        const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/certificates')
        cert.image = { url: uploadRes.url, publicId: uploadRes.publicId }
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Update certificate image failed:', uploadErr.message)
      }
    }

    await cert.save()
    res.json({ success: true, data: cert })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function deleteCertificate(req, res) {
  try {
    const { id } = req.params
    const cert = await Certificate.findById(id)
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' })
    }

    if (cert.image && cert.image.publicId) {
      await deleteFromCloudinary(cert.image.publicId)
    }

    await Certificate.findByIdAndDelete(id)
    res.json({ success: true, message: 'Certificate deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
