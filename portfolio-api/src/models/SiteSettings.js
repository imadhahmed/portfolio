import mongoose from 'mongoose'

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    cv: {
      url: { type: String, default: '/CV.pdf' },
      publicId: { type: String },
      fileName: { type: String, default: 'Imadh_Ahmed_CV.pdf' },
      updatedAt: { type: Date, default: Date.now },
    },
    heroSubtitle: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
)

export const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema)
