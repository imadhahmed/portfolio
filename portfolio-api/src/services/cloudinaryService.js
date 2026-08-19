import { cloudinary } from '../config/cloudinary.js'

export async function uploadToCloudinary(fileBuffer, folder = 'portfolio', resourceType = 'auto') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary Upload Error]:', error)
          let message = error.message || 'Failed to upload image to Cloudinary'
          if (error.http_code === 403 || error.http_code === 401 || message.includes('403') || message.includes('disabled')) {
            message = 'Cloudinary Upload Failed (403 Forbidden / Cloud Account Disabled). Please check your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET credentials in portfolio-api/.env'
          }
          return reject(new Error(message))
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        })
      }
    )
    uploadStream.end(fileBuffer)
  })
}

export async function deleteFromCloudinary(publicId, resourceType = 'image') {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
  } catch (err) {
    console.warn(`[Cloudinary Delete Warning] Failed to delete ${publicId}:`, err.message)
  }
}

