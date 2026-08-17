import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String },
    credentialUrl: { type: String },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
  },
  { timestamps: true }
)

export const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema)
