import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import User from '../models/User.model.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return next(new ApiError(401, 'Unauthorized'))
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user)
      return next(new ApiError(401, "User with provided token Doesn't Exists"))
    if (!user.isActive) return next(new ApiError(403, 'User is Deactivated'))
    req.user = user
    next()
  } catch (err) {
    next(new ApiError(401, 'Token Invalid or Expired'))
  }
}

export const restrictToAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin Access Only'))
  }
  next()
}
