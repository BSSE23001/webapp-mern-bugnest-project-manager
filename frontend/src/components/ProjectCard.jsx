import { useSelector } from 'react-redux'

const ProjectCard = ({
  project,
  onDelete,
  onRestore,
  onEdit,
  onManageMembers,
}) => {
  const { user } = useSelector((state) => state.auth)
  const isAdmin = project.members?.some(
    (m) => m.user._id === user._id && m.role === 'admin',
  )
  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded space-y-2 shadow'>
      <h3 className='text-lg font-bold'>{project.name}</h3>
      <p className='text-sm text-gray-500'>{project.description}</p>
      <p className='text-sm'>
        Members: {project.members?.map((m) => m.user.name).join(', ')}
      </p>
      {isAdmin && (
        <div className='flex gap-2 mt-2'>
          {!project.isDeleted ? (
            <>
              <button
                onClick={() => onEdit(project)}
                className='p-2 rounded-xl text-shadow-blue-300 text-shadow shadow text-blue-800 text-sm cursor-pointer hover:bg-purple-800 hover:text-white dark:text-white dark:bg-gray-700'
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className='p-2 rounded-xl text-shadow-red-300 text-shadow-xs shadow text-red-800 text-sm cursor-pointer hover:bg-red-800 hover:text-white'
              >
                Delete
              </button>
              <button
                onClick={() => onManageMembers(project)}
                className='p-2 rounded-xl text-shadow-blue-300 text-shadow-xs shadow text-blue-800 text-sm cursor-pointer hover:bg-purple-800 hover:text-white'
              >
                Manage Members
              </button>
            </>
          ) : (
            <button
              onClick={() => onRestore(project._id)}
              className='p-2 rounded-xl text-shadow-green-300 text-shadow-xs shadow text-green-800 text-sm cursor-pointer hover:bg-green-800 hover:text-white'
            >
              Restore
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectCard
