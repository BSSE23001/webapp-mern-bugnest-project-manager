import express from 'express'
import { protect, restrictToAdmin } from '../middlewares/auth.middleware.js'
import ApiResponse from '../utils/ApiResponse.js'

const router = express.Router()

router.get('/me', protect, (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, 'Logged in User'))
})

router.get('/admin', protect, restrictToAdmin, (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, 'Secret Admin Functionalities'))
})

export default router
