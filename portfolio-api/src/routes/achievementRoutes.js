import { Router } from 'express'
import { getAchievements, getAllAchievementsAdmin, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = Router()

router.get('/', getAchievements)
router.get('/all', authMiddleware, getAllAchievementsAdmin)
router.post('/', authMiddleware, upload.single('image'), createAchievement)
router.put('/:id', authMiddleware, upload.single('image'), updateAchievement)
router.delete('/:id', authMiddleware, deleteAchievement)

export default router
