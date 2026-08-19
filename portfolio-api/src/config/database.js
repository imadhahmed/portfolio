import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('[Database Warning] MONGODB_URI is missing from environment variables. Running in mock/disconnected mode.')
    return
  }

  try {
    const conn = await mongoose.connect(uri)
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`)
  } catch (error) {
    console.error(`[MongoDB Connection Error]`, error.message)
    throw error
  }
}
