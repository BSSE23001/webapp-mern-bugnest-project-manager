import { useUpdateProjectMutation } from '../projectsApi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
})

const UpdateProjectForm = ({ project, onClose }) => {
  const [updateProject] = useUpdateProjectMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  })

  const onSubmit = async (data) => {
    await updateProject({ id: project._id, body: data })
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4'
    >
      <h2 className='text-lg font-bold'>Update Project</h2>
      <input
        type='text'
        placeholder='Project name'
        {...register('name')}
        className='w-full p-2 rounded border'
      />
      <p className='text-red-500 text-sm'>{errors.name?.message}</p>

      <textarea
        placeholder='Description'
        {...register('description')}
        className='w-full p-2 rounded border'
      />
      <button className='bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded'>
        Update
      </button>
      <button
        type='button'
        className='text-red-500 py-1 px-4 rounded'
        onClick={() => onClose()}
      >
        ❌
      </button>
    </form>
  )
}

export default UpdateProjectForm
