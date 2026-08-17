import { Router } from 'express'
import { getSettings, uploadCV } from '../controllers/settingsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = Router()

router.get('/', getSettings)
router.post('/cv', authMiddleware, upload.single('cv'), uploadCV)

export default router
