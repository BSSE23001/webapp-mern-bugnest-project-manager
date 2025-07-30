import express from 'express'
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  softDeleteIssue,
  restoreIssue,
} from '../controllers/issue.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(protect)

router.post('/', createIssue)
router.get('/', getAllIssues)
router.get('/:id', getIssueById)
router.patch('/:id', updateIssue)
router.delete('/:id', softDeleteIssue)
router.post('/restore/:id', restoreIssue)

export default router
