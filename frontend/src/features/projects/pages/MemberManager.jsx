import { useAddMemberMutation, useRemoveMemberMutation } from '../projectsApi'
import { useState } from 'react'

const MemberManager = ({ project, onClose }) => {
  const [addMember] = useAddMemberMutation()
  const [removeMember] = useRemoveMemberMutation()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('developer')

  const handleAdd = () => {
    addMember({ id: project._id, body: { userId: email, role } })
  }

  const handleRemove = (userId) => {
    removeMember({ id: project._id, userId })
  }

  return (
    <div className='p-4'>
      <h3 className='text-lg py-2'>Manage Members</h3>
      <input
        placeholder='User ID'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='p-2 m-2 border rounded'
      />
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
