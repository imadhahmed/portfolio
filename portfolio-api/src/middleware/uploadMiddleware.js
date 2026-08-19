import multer from 'multer'
import path from 'path'

const storage = multer.memoryStorage()

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
]

const allowedExtensions = /jpeg|jpg|png|webp|gif|svg|pdf/

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '')
    const isMimeAllowed = allowedMimeTypes.includes(file.mimetype)
    const isExtAllowed = allowedExtensions.test(ext)

    if (isMimeAllowed || isExtAllowed) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file format. Only images (PNG, JPG, WEBP, GIF, SVG) and PDF files are allowed.'))
    }
  },
})
