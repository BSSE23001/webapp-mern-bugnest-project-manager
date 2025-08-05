import { useGetAllUsersQuery } from '../../users/usersApi'
import { useAddMemberMutation, useRemoveMemberMutation } from '../projectsApi'
import { useState } from 'react'

const MemberManager = ({ project, onClose }) => {
  const [addMember] = useAddMemberMutation()
  const [removeMember] = useRemoveMemberMutation()
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('developer')

  const {
    data: { data: { users = [] } = {} } = {},
    isLoading: isLoadingUsers,
  } = useGetAllUsersQuery()

  const handleAdd = () => {
    if (userId) {
      addMember({ id: project._id, body: { userId, role } })
    }
  }

  const handleRemove = (userId) => {
    removeMember({ id: project._id, userId })
  }

  return (
    <div className='p-4'>
      <h3 className='text-lg py-2'>Manage Members</h3>

      <div className='flex items-center gap-2'>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className='p-2 m-2 border rounded'
          disabled={isLoadingUsers}
        >
          <option value=''>
            {isLoadingUsers ? 'Loading Users...' : 'Select a User'}
          </option>
          {users?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='p-2 m-2 border rounded'
        >
          <option value='developer'>Developer</option>
          <option value='tester'>Tester</option>
          <option value='admin'>Admin</option>
        </select>
        <button
          className='p-2 m-2 rounded-xl text-shadow-blue-300 text-shadow-xs shadow text-blue-800 text-sm cursor-pointer hover:bg-purple-800 hover:text-white'
          onClick={handleAdd}
          disabled={!userId}
        >
          Add
        </button>
        <button
          type='button'
          className='p-2 rounded-xl text-shadow-red-300 text-shadow-xs shadow text-red-800 text-sm cursor-pointer hover:bg-red-800 hover:text-white'
          onClick={() => onClose()}
        >
          Close
        </button>
      </div>

      <ul className='mt-4'>
        {project.members?.map((m) => (
          <li
            key={m.user._id}
            className='p-5 flex justify-between bg-gray-50 rounded-2xl'
          >
            {m.user.name} ({m.role})
            <button
              className='p-2 rounded-xl text-shadow-red-300 text-shadow-xs shadow text-red-800 text-sm cursor-pointer hover:bg-red-800 hover:text-white'
              onClick={() => handleRemove(m.user._id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MemberManager
