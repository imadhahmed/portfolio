import { SiteSettings } from '../models/SiteSettings.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js'

// GET /api/settings - Fetch site settings & CV URL directly from MongoDB
export async function getSettings(req, res) {
  try {
    let settings = await SiteSettings.findOne({ key: 'main' })
    if (!settings) {
      settings = await SiteSettings.create({
        key: 'main',
        cv: {
          url: '#',
          fileName: 'CV.pdf',
        },
      })
    }
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/settings/cv - Upload PDF to Cloudinary & Save Cloudinary URL in MongoDB
export async function uploadCV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CV PDF file is required.' })
    }

    let settings = await SiteSettings.findOne({ key: 'main' })
    if (!settings) {
      settings = new SiteSettings({ key: 'main' })
    }

    const fileName = req.file.originalname || 'CV.pdf'

    // 1. Delete previous Cloudinary PDF if present
    if (settings.cv && settings.cv.publicId) {
      try {
        await deleteFromCloudinary(settings.cv.publicId, 'raw')
      } catch (e) {
        console.warn('[Cloudinary Delete Warning]:', e.message)
      }
    }

    // 2. Upload PDF file to Cloudinary
    const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/cv', 'auto')

    let cvUrl = uploadRes.url
    if (cvUrl && cvUrl.includes('/upload/') && !cvUrl.includes('fl_attachment')) {
      cvUrl = cvUrl.replace('/upload/', '/upload/fl_attachment/')
    }

    // 3. Save Cloudinary URL and metadata directly to MongoDB
    settings.cv = {
      url: cvUrl,
      publicId: uploadRes.publicId,
      fileName: fileName,
      updatedAt: new Date(),
    }

    await settings.save()

    res.json({
      success: true,
      data: settings.cv,
      message: 'CV PDF uploaded to Cloudinary & URL stored in MongoDB successfully!',
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
