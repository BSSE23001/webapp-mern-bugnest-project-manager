import express from 'express'

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  softDeleteProject,
  restoreProject,
  addMember,
  removeMember,
  getAllProjectsWithStats,
} from '../controllers/project.controller.js'

import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(protect)

router.post('/', createProject)
router.get('/', getProjects)
router.get('/:id', getProjectById)
router.patch('/:id', updateProject)
router.delete('/:id', softDeleteProject)
router.post('/restore/:id', restoreProject)

// Route for getting project stats
router.get('/with-stats', getAllProjectsWithStats)

// Member Management
router.post('/:id/members', addMember)
router.delete('/:id/members/:userId', removeMember)

export default router
