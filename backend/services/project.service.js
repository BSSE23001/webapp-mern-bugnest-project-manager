import Project from '../models/Project.model.js'
import mongoose from 'mongoose'
import ApiError from '../utils/ApiError.js'

export const create = async (data, creatorId) => {
  const project = await Project.create({
    ...data,
    createdBy: creatorId,
    members: [
      {
        user: creatorId,
        role: admin,
      },
    ],
  })
  return project
}

export const getAll = async (userId, query) => {
  const { page = 1, limit = 10, search = '' } = query
  const filter = {
    isDeleted: false,
    members: {
      $elemMatch: { user: userId },
    },
    ...(search && { name: new RegExp(search, 'i') }),
  }
  const skip = (page - 1) * limit

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate('members.user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(+limit),
    Project.countDocuments(filter),
  ])

  return {
    projects,
    total,
    currentPage: +page,
    totalPages: Math.ceil(total / limit),
  }
}

export const getById = async (projectId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, 'Invalid Id')
  return await Project.findById(projectId).populate(
    'members.user',
    'name email',
  )
}

export const update = async (projectId, data, userId) => {}

export const softDelete = async (projectId) => {}

export const restore = async (projectId) => {}

export const addMember = async (projectId, data, userId) => {}

export const removeMember = async (projectId, memberId, userId) => {}
