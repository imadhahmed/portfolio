import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'Certification' },
    issuer: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    credentialUrl: { type: String },
    image: {
      url: { type: String, required: true },
      publicId: { type: String },
    },
    issueDate: { type: String },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    displayOrder: { type: Number, default: 0 },
    color: { type: String, default: '#00df8f' },
  },
  { timestamps: true }
)

certificateSchema.index({ status: 1, displayOrder: 1, createdAt: -1 })

export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema)
