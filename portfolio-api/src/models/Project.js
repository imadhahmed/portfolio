import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: 'Web Development' },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    image: {
      url: { type: String, required: true },
      publicId: { type: String },
    },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    displayOrder: { type: Number, default: 0 },
    color: { type: String, default: '#00df8f' },
  },
  { timestamps: true }
)

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)
