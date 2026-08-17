import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin.js'

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' })
  }

  try {
    let admin = await Admin.findOne({ email: email.toLowerCase() })

    // Auto-seed first admin if no admin exists yet
    const adminCount = await Admin.countDocuments()
    if (adminCount === 0) {
      const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || password
      const hash = await bcrypt.hash(defaultPassword, 10)
      admin = await Admin.create({
        email: email.toLowerCase(),
        passwordHash: hash,
      })
      console.log(`[Admin Initialized] Created first admin user: ${email}`)
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production'
    const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, secret, { expiresIn: '7d' })

    res.json({
      success: true,
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getMe(req, res) {
  res.json({ success: true, user: req.user })
}
