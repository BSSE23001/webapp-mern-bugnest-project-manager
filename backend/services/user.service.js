import User from '../models/User.model.js'
import ApiError from '../utils/ApiError.js'
import bcrypt from 'bcryptjs'

export const getAll = async ({
  search = '',
  page = 1,
  limit = 10,
  role,
  isActive,
}) => {
  const filter = {
    ...(role && { role }),
    ...(isActive !== undefined && { isActive: isActive === 'true' }),
    ...(search && {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ],
    }),
  }

  const skip = (page - 1) * limit

  const [users, total] = await Promise.all([
    User.find(filter).select('-password').skip(skip).limit(+limit),
    User.countDocuments(filter),
  ])

  return {
    users,
    total,
    currentPage: +page,
    totalPages: Math.ceil(total / limit),
  }
}

export const updateRole = async (userId, role) => {
  const user = await User.findById(userId)
  if (!user) throw new ApiError(404, 'User not found')
  user.role = role
  await user.save()
  return user
}

export const updateSelf = async (userId, data) => {
  const user = await User.findById(userId)
  if (!user) throw new ApiError(404, 'User not found')

  const { name, email, password } = data

  if (name) user.name = name
  if (email) user.email = email
  if (password) user.password = await bcrypt.hash(password, 10)

  await user.save()
  return user
}

export const softDelete = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new ApiError(404, 'User not found')
  user.isActive = false
  await user.save()
  return user
}

export const toggleUserActivation = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new ApiError(404, 'User not found')

  user.isActive = !user.isActive
  await user.save()

  return user
}
