import Project from '../models/Project.model.js'
import User from '../models/User.model.js'
import mongoose from 'mongoose'
import ApiError from '../utils/ApiError.js'

/* Note Below We are Talking About the admin rights but
    These admin rights are related to the admin of the
    Project not the whole application
 */

export const create = async (data, creatorId) => {
  const project = await Project.create({
    ...data,
    createdBy: creatorId,
    members: [
      {
        user: creatorId,
        role: 'admin',
      },
    ],
  })
  return project
}

export const getAll = async (userId, query) => {
  const { page = 1, limit = 10, search = '' } = query
  const filter = {
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

export const update = async (projectId, data, requesterId) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApiError(404, 'Project Not Found')
  const isAdmin = project.members.some(
    (m) => m.user.toString() === requesterId && m.role === 'admin',
  )
  if (!isAdmin) throw new ApiError(403, 'Only Admin can Update Project')

  Object.assign(project, data)
  await project.save()
  return project
}

export const softDelete = async (projectId) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApiError(404, 'Project Not Found')
  //   We Should Normally make such deletion and restoration to admin only rights
  //   const isAdmin = project.members.some(
  //     (m) => m.user.toString() === requesterId && m.role === 'admin',
  //   )
  //   if (!isAdmin) throw new ApiError(403, 'Only Admin can Soft Delete Project')
  project.isDeleted = true
  await project.save()
  return project
}

export const restore = async (projectId) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApiError(404, 'Project Not Found')
  //   We Should Normally make such deletion and restoration to admin only rights
  //   const isAdmin = project.members.some(
  //     (m) => m.user.toString() === requesterId && m.role === 'admin',
  //   )
  //   if (!isAdmin) throw new ApiError(403, 'Only Admin can Restore Project')
  project.isDeleted = false
  await project.save()
  return project
}

// Below Functionalities are only for the ADMIN OF Project
export const addMember = async (projectId, { userId, role }, requesterId) => {
  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new ApiError(401, 'Invalid Member Id')

  const project = await Project.findById(projectId)
  if (!project) throw new ApiError(404, 'Project Not Found')
  const isAdmin = project.members.some(
    (m) => m.user.toString() === requesterId && m.role === 'admin',
  )
  if (!isAdmin)
    throw new ApiError(403, 'Only Admin can Add a Member to Project')
  const userExists = await User.findById(userId)
  if (!userExists) throw new ApiError(404, 'User Not Found')
  const alreadyExists = project.members.some(
    (m) => m.user.toString() === userId,
  )
  if (alreadyExists) throw new ApiError(400, 'Member Already Exists')

  project.members.push({ user: userId, role })
  await project.save()
  const populatedProject = await project.populate('members.user', 'name email')
  return populatedProject
}

export const removeMember = async (projectId, memberId, requesterId) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApiError(404, 'Project Not Found')
  const isAdmin = project.members.some(
    (m) => m.user.toString() === requesterId && m.role === 'admin',
  )
  if (!isAdmin)
    throw new ApiError(403, 'Only Admin can Remove a Member from Project')
  const updated = project.members.filter((m) => m.user.toString() !== memberId)
  project.members = updated
  await project.save()
  const populatedProject = await project.populate('members.user', 'name email')
  return populatedProject
}

// Note We are doing toString to the user of member because that is
// of the type ObjectId and we want to compare plain Strings

export const getProjectsWithStats = async (query) => {
  const { search = '', status } = query

  const matchStage = {
    name: { $regex: search, $options: 'i' },
  }
  if (status) matchStage.status = status

  const projects = await Project.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'issues',
        let: { projectId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$project', '$$projectId'] },
                  { $eq: ['$isDeleted', false] },
                ],
              },
            },
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
        ],
        as: 'issueStats',
      },
    },
    {
      $addFields: {
        issueSummary: {
          $arrayToObject: {
            $map: {
              input: '$issueStats',
              as: 'stat',
              in: { k: '$$stat._id', v: '$$stat.count' },
            },
          },
        },
      },
    },
    { $project: { issueStats: 0 } },
    { $sort: { createdAt: -1 } },
  ])

  return projects
}
