import {
  useGetProjectsQuery,
  useSoftDeleteProjectMutation,
  useRestoreProjectMutation,
} from '../projectsApi'
import { useState } from 'react'
import CreateProjectForm from './CreateProjectForm'
import UpdateProjectForm from './UpdateProjectForm'
import MemberManager from './MemberManager'
import ProjectCard from '../../../components/ProjectCard'

const ProjectList = () => {
  const [search, setSearch] = useState('')

  // State for managing modals and active projects
  const [showCreate, setShowCreate] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [manageMembers, setManageMembers] = useState(null)

  // RTK Query hooks
  const { data: result, isLoading } = useGetProjectsQuery({ search })
  const [softDelete] = useSoftDeleteProjectMutation()
  const [restore] = useRestoreProjectMutation()

  // Handler functions
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      softDelete(id)
    }
  }

  const handleRestore = (id) => {
    restore(id)
  }

  console.log('Project Data:', result)
  console.log('Is Loading:', isLoading)
  console.log('Projects Array:', result?.data)

  if (isLoading) {
    return <p>Loading Projects....</p>
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Search projects...'
          className='p-2 rounded border-2'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowCreate(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'
        >
          + Create Project
        </button>
      </div>

      <div className='grid gap-4'>
        {result?.data?.projects?.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onDelete={handleDelete}
            onRestore={handleRestore}
            onEdit={setEditProject}
            onManageMembers={setManageMembers}
          />
        ))}
      </div>

      {showCreate && <CreateProjectForm onClose={() => setShowCreate(false)} />}
      {editProject && (
        <UpdateProjectForm
          project={editProject}
          onClose={() => setEditProject(null)}
        />
      )}
      {manageMembers && (
        <MemberManager
          project={manageMembers}
          onClose={() => setManageMembers(null)}
        />
      )}
    </div>
  )
}

export default ProjectList
