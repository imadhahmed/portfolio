import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)
