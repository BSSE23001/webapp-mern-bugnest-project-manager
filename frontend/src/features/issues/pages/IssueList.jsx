import { useState } from 'react'
import {
  useGetAllIssuesQuery,
  useRestoreIssueMutation,
  useSoftDeleteIssueMutation,
} from '../issuesApi'

const initialQueryState = {
  page: 1,
  search: '',
  status: '',
  priority: '',
}

const IssueList = () => {
  const [query, setQuery] = useState(initialQueryState)
  const { data: { data: { issues = [] } = {} } = {}, isLoading } =
    useGetAllIssuesQuery()
  const [deleteIssue] = useSoftDeleteIssueMutation()
  const [restoreIssue] = useRestoreIssueMutation()
  const handleDelete = (id) => {
    if (confirm('Soft delete this issue?')) deleteIssue(id)
  }

  const handleRestore = (id) => restoreIssue(id)

  if (isLoading) return <p>Loading issues...</p>
  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Issues</h2>
      <div className='flex gap-2 mb-4'>
        <input
          placeholder='Search'
          className='p-2 border rounded'
          value={query.search}
          onChange={(e) => setQuery({ ...query, search: e.target.value })}
        />
        <select
          className='p-2 border rounded'
          onChange={(e) => setQuery({ ...query, status: e.target.value })}
        >
          <option value=''>Status</option>
          <option value='open'>Open</option>
          <option value='in-progress'>In Progress</option>
          <option value='resolved'>Resolved</option>
        </select>
        <select
          className='p-2 border rounded'
          onChange={(e) => setQuery({ ...query, priority: e.target.value })}
        >
          <option value=''>Priority</option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>

      <div className='grid gap-4'>
        {issues?.map((issue) => (
          <div
            key={issue._id}
            className='bg-white dark:bg-gray-800 p-4 rounded shadow'
          >
            <h3 className='font-semibold'>{issue.title}</h3>
            <p>{issue.description}</p>
            <p className='text-sm text-gray-500'>
              Project: {issue.project?.name}
            </p>
            <p className='text-sm text-gray-500'>
              Assigned to: {issue.assignedTo?.name}
            </p>
            <p>
              Status: {issue.status} | Priority: {issue.priority}
            </p>

            {!issue.isDeleted ? (
              <button
                onClick={() => handleDelete(issue._id)}
                className='text-red-500 mt-2'
              >
                Delete
              </button>
            ) : (
              <button
                onClick={() => handleRestore(issue._id)}
                className='text-green-500 mt-2'
              >
                Restore
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default IssueList
