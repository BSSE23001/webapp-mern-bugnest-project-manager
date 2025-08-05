import express from 'express'
import {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} from '../controllers/user.controller.js'
import { protect, restrictToAdmin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(protect)

// Admin-only routes
router.get('/', getAllUsers)
router.patch('/:id/role', restrictToAdmin, updateUserRole)
router.patch('/:id/status', restrictToAdmin, toggleUserStatus)

// Self-actions
router.get('/me', getMyProfile)
router.patch('/me', updateMyProfile)
router.delete('/me', deleteMyAccount)

export default router
