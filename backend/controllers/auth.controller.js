import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

const cookieOptions = {
  httpOnly: true,
  sameSite: 'Lax',
  secure: false,
}

const generateToken = (userId, type = 'access') => {
  const expiresIn = type === 'access' ? '15m' : '7d'
  const secret =
    type === 'access' ? process.env.JWT_SECRET : process.env.REFRESH_SECRET

  return jwt.sign(
    {
      id: userId,
    },
    secret,
    { expiresIn },
  )
}

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const found = await User.findOne({ email })
    if (found) return next(new ApiError(409, 'Email Already Exists'))
    const user = await User.create({ name, email, password })
    const accessToken = generateToken(user._id)
    const refreshToken = generateToken(user._id, 'refresh')
    res.cookie('token', accessToken, cookieOptions)
    res.cookie('refreshToken', refreshToken, cookieOptions)
    return res.status(201).json(new ApiResponse(201, user, 'User Registered!'))
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      email,
    })
    if (!user) return next(new ApiError(401, 'Invalid Credentials'))
    const isValid = await user.comparePassword(password)
    if (!isValid) return next(new ApiError(401, 'Invalid Credentials'))
    if (!user.isActive) return next(new ApiError(403, 'User is Deactivated'))
    const accessToken = generateToken(user._id)
    const refreshToken = generateToken(user._id, 'refresh')
    res.cookie('token', accessToken, cookieOptions)
    res.cookie('refreshToken', refreshToken, cookieOptions)
    return res.status(200).json(new ApiResponse(200, user, 'Login Successful'))
  } catch (err) {
    next(err)
  }
}

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.clearCookie('refreshToken')
    return res.status(200).json(new ApiResponse(200, null, 'Logout Successful'))
  } catch (err) {
    next(err)
  }
}

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) return next(new ApiError(401, 'No Refresh Token Exists'))
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) return next(new ApiError(401, 'User Not Found'))

    const accessToken = generateToken(user._id)
    res.cookie('token', accessToken, cookieOptions)
    return res
      .status(200)
      .json(new ApiResponse(200, user, 'Access Token Refreshed'))
  } catch (err) {
    next(new ApiError(401, 'Invalid Refresh Token'))
  }
}
