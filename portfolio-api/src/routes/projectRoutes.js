import { Router } from 'express'
import { getProjects, getAllProjectsAdmin, createProject, updateProject, deleteProject, reorderProjects } from '../controllers/projectController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = Router()

router.get('/', getProjects)
router.get('/all', authMiddleware, getAllProjectsAdmin)
router.post('/', authMiddleware, upload.single('image'), createProject)
router.put('/reorder', authMiddleware, reorderProjects)
router.put('/:id', authMiddleware, upload.single('image'), updateProject)
router.delete('/:id', authMiddleware, deleteProject)

export default router

