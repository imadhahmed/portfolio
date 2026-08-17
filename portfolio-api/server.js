import dotenv from 'dotenv'
dotenv.config()

import app from './src/app.js'
import { connectDB } from './src/config/database.js'
import { setupCloudinary } from './src/config/cloudinary.js'

const PORT = process.env.PORT || 5000

async function startServer() {
  await connectDB()
  setupCloudinary()

  app.listen(PORT, () => {
    console.log(`=================================`)
    console.log(`🚀 Portfolio API running on port ${PORT}`)
    console.log(`   Health Check: http://localhost:${PORT}/health`)
    console.log(`   Projects API: http://localhost:${PORT}/api/projects`)
    console.log(`=================================`)
  })
}

startServer()
