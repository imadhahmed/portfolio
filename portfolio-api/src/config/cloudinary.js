import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

function clean(val) {
  if (!val) return ''
  return val.trim().replace(/^["']|["']$/g, '')
}

const cloudinary_url = clean(process.env.CLOUDINARY_URL)
const cloud_name = clean(process.env.CLOUDINARY_CLOUD_NAME)
const api_key = clean(process.env.CLOUDINARY_API_KEY)
const api_secret = clean(process.env.CLOUDINARY_API_SECRET)

if (cloudinary_url) {
  cloudinary.config({
    cloudinary_url,
    secure: true,
  })
  console.log(`[Cloudinary Initialized via CLOUDINARY_URL]`)
} else {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  })
  console.log(`[Cloudinary Initialized] Cloud Name: "${cloud_name || 'MISSING'}", API Key: "${api_key ? '***' + api_key.slice(-4) : 'MISSING'}"`)
}

export function setupCloudinary() {
  if (cloudinary_url) {
    cloudinary.config({ cloudinary_url, secure: true })
  } else {
    cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
  }
}

export { cloudinary }
