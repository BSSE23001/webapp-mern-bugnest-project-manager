import * as UserService from '../services/user.service.js'
import ApiResponse from '../utils/ApiResponse.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAll(req.query)
    return res.status(200).json(new ApiResponse(200, users, 'Users fetched'))
  } catch (err) {
    next(err)
  }
}

export const updateUserRole = async (req, res, next) => {
  try {
    const updated = await UserService.updateRole(req.params.id, req.body.role)
    return res.status(200).json(new ApiResponse(200, updated, 'Role Updated'))
  } catch (err) {
    next(err)
  }
}

export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await UserService.toggleUserActivation(req.params.id)
    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User status toggled'))
  } catch (err) {
    next(err)
  }
}

export const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json(new ApiResponse(200, req.user, 'Your Profile'))
  } catch (err) {
    next(err)
  }
}

export const updateMyProfile = async (req, res, next) => {
  try {
    const updated = await UserService.updateSelf(req.user.id, req.body)
    return res
      .status(200)
      .json(new ApiResponse(200, updated, 'Profile Updated'))
  } catch (err) {
    next(err)
  }
}

export const deleteMyAccount = async (req, res, next) => {
  try {
    const deleted = await UserService.softDelete(req.user.id)
    return res
      .status(200)
      .json(new ApiResponse(200, deleted, 'Account Deactivated'))
  } catch (err) {
    next(err)
  }
}
