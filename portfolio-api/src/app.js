import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'
import achievementRoutes from './routes/achievementRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'

const app = express()

// Security Headers
app.use(helmet())

// CORS Configuration
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,https://imadh.me')
  .split(',')
  .concat((process.env.ADMIN_URL || 'http://localhost:5174,https://admin.imadh.me').split(','))
  .map((o) => o.trim())

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true)
      } else {
        callback(null, true) // Allow for developer convenience
      }
    },
    credentials: true,
  })
)

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
app.use(limiter)

// Body Parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health Check Root Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Imadh Portfolio API', timestamp: new Date() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/settings', settingsRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Exception Error]:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

export default app
