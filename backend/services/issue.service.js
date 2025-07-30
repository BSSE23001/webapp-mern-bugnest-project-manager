import Issue from '../models/Issue.model.js'
import ApiError from '../utils/ApiError.js'
import mongoose from 'mongoose'

export const create = async (data, userId) => {
  const newIssue = await Issue.create({
    ...data,
    createdBy: userId,
  })
  return newIssue
}

export const getAll = async (query) => {
  const { page = 1, limit = 10, search = '', status, priority, project } = query

  const filter = {
    isDeleted: false, // Ensures only non-deleted issues are fetched
    ...(status && { status }), // You might want to add this if 'status' is a valid filter
    ...(priority && { priority }), // Adds priority filter if provided
    ...(project && mongoose.Types.ObjectId.isValid(project) ? { project } : {}), // Adds project filter if provided and is a valid ObjectId
    ...(search && {
      $or: [
        { title: new RegExp(search, 'i') }, // Case-insensitive search on title
        { description: new RegExp(search, 'i') }, // Case-insensitive search on description
      ],
    }),
  }

  const skip = (page - 1) * limit

  const [issues, total] = await Promise.all([
    Issue.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('project', 'name')
      .skip(skip)
      .limit(+limit), // '+' unary operator attempts to convert the limit variable to a number
    Issue.countDocuments(filter),
  ])

  return {
    issues,
    total,
    currentPage: +page,
    totalPages: Math.ceil(total / limit),
  }
}

export const getById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, 'Invalid ID')
  return await Issue.findById(id)
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email')
    .populate('project', 'name')
}

export const update = async (id, data) => {
  const updated = await Issue.findByIdAndUpdate(id, data, { new: true })
  if (!updated) throw new ApiError(404, 'Issue Not Found')
  return updated
}

export const softDelete = async (id) => {
  const issue = await Issue.findById(id)
  if (!issue) throw new ApiError(404, 'Issue Not Found')
  issue.isDeleted = true
  await issue.save()
  return issue
}

export const restore = async (id) => {
  const issue = await Issue.findById(id)
  if (!issue) throw new ApiError(404, 'Issue Not Found')
  issue.isDeleted = false
  await issue.save()
  return issue
}
