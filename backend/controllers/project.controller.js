import * as ProjectService from '../services/project.service.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'

export const createProject = async (req, res, next) => {
  try {
    const project = await ProjectService.create(req.body, req.user.id)
    return res
      .status(201)
      .json(new ApiResponse(201, project, 'Project Created'))
  } catch (err) {
    next(err)
  }
}

export const getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectService.getAll(req.user.id, req.query)
    return res
      .status(200)
      .json(new ApiResponse(200, projects, 'Project Created'))
  } catch (err) {
    next(err)
  }
}

export const getProjectById = async (req, res, next) => {
  try {
    const project = await ProjectService.getById(req.params.id)
    if (!project) return next(new ApiError(404, 'Project Not Found'))
    return res
      .status(200)
      .json(new ApiResponse(200, project, 'Project Fetched'))
  } catch (err) {
    next(err)
  }
}

export const updateProject = async (req, res, next) => {
  try {
    const updated = await ProjectService.update(
      req.params.id,
      req.body,
      req.user.id,
    )
    return res
      .status(200)
      .json(new ApiResponse(200, updated, 'Project Updated'))
  } catch (err) {
    next(err)
  }
}

export const softDeleteProject = async (req, res, next) => {
  try {
    const deleted = await ProjectService.softDelete(req.params.id)
    return res
      .status(200)
      .json(new ApiResponse(200, deleted, 'Project Soft Deleted'))
  } catch (err) {
    next(err)
  }
}

export const restoreProject = async (req, res, next) => {
  try {
    const restored = await ProjectService.restore(req.params.id)
    return res
      .status(200)
      .json(new ApiResponse(200, restored, 'Project Restored'))
  } catch (err) {
    next(err)
  }
}

export const addMember = async (req, res, next) => {
  try {
    const result = await ProjectService.addMember(
      req.params.id,
      req.body,
      req.user.id,
    )
    return res.status(200).json(new ApiResponse(200, result, 'Member Added'))
  } catch (err) {
    next(err)
  }
}

export const removeMember = async (req, res, next) => {
  try {
    const result = await ProjectService.removeMember(
      req.params.id,
      req.params.userId,
      req.user.id,
    )
    return res.status(200).json(new ApiResponse(200, result, 'Member Removed'))
  } catch (err) {
    next(err)
  }
}

export const getAllProjectsWithStats = async (req, res, next) => {
  try {
    const data = await ProjectService.getProjectsWithStats(req.query)
    return res.status(200).json(new ApiResponse(200, data, 'Project Stats'))
  } catch (error) {
    next(error)
  }
}
