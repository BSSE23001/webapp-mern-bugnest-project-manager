import express from 'express'
import {
  refreshToken,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.get('/refresh-token', refreshToken)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
