import Issue from '../models/Issue.model.js'
import Project from '../models/Project.model.js'
import User from '../models/User.model.js'

export const getAdminStats = async () => {
  const [issueStats, issuesOverTime, users, projects] = await Promise.all([
    Issue.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Issue.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]),
    Project.aggregate([
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          openProjects: {
            $sum: {
              $cond: [{ $eq: ['$status', 'open'] }, 1, 0],
            },
          },
          closedProjects: {
            $sum: {
              $cond: [{ $eq: ['$status', 'closed'] }, 1, 0],
            },
          },
        },
      },
    ]),
  ])

  return {
    issueStats: issueStats.reduce((acc, item) => {
      acc[item._id] = item.count
      return acc
    }, {}),
    issuesOverTime,
    userRoles: users.reduce((acc, u) => {
      acc[u._id] = u.count
      return acc
    }, {}),
    projectSummary: projects[0] || {
      totalProjects: 0,
      openProjects: 0,
      closedProjects: 0,
    },
  }
}

export const issueStatusStats = async (user) => {
  const matchStage = user.role === 'admin' ? {} : { assignee: user._id }

  const data = await Issue.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])

  return data.reduce((acc, item) => {
    acc[item._id] = item.count
    return acc
  }, {})
}

export const issueTimeSeriesStats = async (user) => {
  const matchStage = user.role === 'admin' ? {} : { assignee: user._id }

  const data = await Issue.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ])

  return data.map((item) => ({
    date: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
    count: item.count,
  }))
}

export const projectIssueStats = async () => {
  const data = await Issue.aggregate([
    {
      $group: {
        _id: '$project',
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'projects',
        localField: '_id',
        foreignField: '_id',
        as: 'project',
      },
    },
    { $unwind: '$project' },
    {
      $project: {
        _id: 0,
        projectId: '$project._id',
        projectName: '$project.name',
        count: 1,
      },
    },
  ])

  return data
}
