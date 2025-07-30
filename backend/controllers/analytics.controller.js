import * as AnalyticsService from '../services/analytics.service.js'
import ApiResponse from '../utils/ApiResponse.js'

export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const stats = await AnalyticsService.getAdminStats()
    return res.status(200).json(new ApiResponse(200, stats, 'Dashboard Stats'))
  } catch (error) {
    next(error)
  }
}

export const getIssueStatusStats = async (req, res, next) => {
  try {
    const result = await AnalyticsService.issueStatusStats(req.user)
    res.status(200).json(new ApiResponse(200, result, 'Status stats'))
  } catch (err) {
    next(err)
  }
}

export const getIssueTimeSeries = async (req, res, next) => {
  try {
    const result = await AnalyticsService.issueTimeSeriesStats(req.user)
    res.status(200).json(new ApiResponse(200, result, 'Time-series stats'))
  } catch (err) {
    next(err)
  }
}

export const getProjectIssueStats = async (req, res, next) => {
  try {
    const result = await AnalyticsService.projectIssueStats()
    res.status(200).json(new ApiResponse(200, result, 'Project stats'))
  } catch (err) {
    next(err)
  }
}
