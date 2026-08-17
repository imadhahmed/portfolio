import { SiteSettings } from '../models/SiteSettings.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js'

export async function getSettings(req, res) {
  try {
    let settings = await SiteSettings.findOne({ key: 'main' })
    if (!settings) {
      settings = await SiteSettings.create({
        key: 'main',
        cv: {
          url: '/CV.pdf',
          fileName: 'Imadh_Ahmed_CV.pdf',
        },
      })
    }
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function uploadCV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CV PDF file is required.' })
    }

    let settings = await SiteSettings.findOne({ key: 'main' })
    if (!settings) {
      settings = new SiteSettings({ key: 'main' })
    }

    if (settings.cv && settings.cv.publicId) {
      await deleteFromCloudinary(settings.cv.publicId, 'raw')
    }

    const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/cv', 'raw')

    settings.cv = {
      url: uploadRes.url,
      publicId: uploadRes.publicId,
      fileName: req.file.originalname || 'Imadh_Ahmed_CV.pdf',
      updatedAt: new Date(),
    }

    await settings.save()
    res.json({ success: true, data: settings.cv, message: 'CV PDF uploaded successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
