import express from 'express'
import { protect, restrictToAdmin } from '../middlewares/auth.middleware.js'
import {
  getIssueStatusStats,
  getIssueTimeSeries,
  getProjectIssueStats,
  getAdminDashboardStats,
} from '../controllers/analytics.controller.js'

const router = express.Router()

router.use(protect)
router.get('/status', getIssueStatusStats)
router.get('/timeline', getIssueTimeSeries)

router.use(restrictToAdmin)
router.get('/project', getProjectIssueStats)
router.get('/admin-stats', getAdminDashboardStats)

export default router
