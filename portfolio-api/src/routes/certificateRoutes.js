import { Router } from 'express'
import { getCertificates, getAllCertificatesAdmin, createCertificate, updateCertificate, deleteCertificate, reorderCertificates } from '../controllers/certificateController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = Router()

router.get('/', getCertificates)
router.get('/all', authMiddleware, getAllCertificatesAdmin)
router.post('/', authMiddleware, upload.single('image'), createCertificate)
router.put('/reorder', authMiddleware, reorderCertificates)
router.put('/:id', authMiddleware, upload.single('image'), updateCertificate)
router.delete('/:id', authMiddleware, deleteCertificate)

export default router

