import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import * as IssueService from '../services/issue.service.js'

export const createIssue = async (req, res, next) => {
  try {
    const issue = await IssueService.create(req.body, req.user.id)
    return res.status(201).json(new ApiResponse(201, issue, 'Issue Created'))
  } catch (err) {
    next(err)
  }
}

export const getAllIssues = async (req, res, next) => {
  try {
    const result = await IssueService.getAll(req.query)
    return res
      .status(200)
      .json(new ApiResponse(200, result, 'All Issues Fetched'))
  } catch (err) {
    next(err)
  }
}

export const getIssueById = async (req, res, next) => {
  try {
    const issue = await IssueService.getById(req.params.id)
    if (!issue) return next(new ApiError(404, 'Issue Not Found'))
    return res.status(200).json(new ApiResponse(200, issue, 'Issue Fetched'))
  } catch (err) {
    next(err)
  }
}

export const updateIssue = async (req, res, next) => {
  try {
    const updated = await IssueService.update(req.params.id, req.body)
    return res.status(200).json(new ApiResponse(200, updated, 'Issue Updated'))
  } catch (err) {
    next(err)
  }
}

export const softDeleteIssue = async (req, res, next) => {
  try {
    const deleted = await IssueService.softDelete(req.params.id)
    return res
      .status(200)
      .json(new ApiResponse(200, updated, 'Issue Soft Deleted'))
  } catch (err) {
    next(err)
  }
}

export const restoreIssue = async (req, res, next) => {
  try {
    const restored = await IssueService.restore(req.params.id)
    return res
      .status(200)
      .json(new ApiResponse(200, restored, 'Issue Restored'))
  } catch (err) {
    next(err)
  }
}
