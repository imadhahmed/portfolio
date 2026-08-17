import { cloudinary } from '../config/cloudinary.js'

export async function uploadToCloudinary(fileBuffer, folder = 'portfolio', resourceType = 'auto') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error)
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
