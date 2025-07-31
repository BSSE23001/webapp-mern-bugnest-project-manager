import { useGetAdminStatsQuery } from '../analyticsApi'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts'

const AdminDashboard = () => {
  const { data: adminStats, isLoading } = useGetAdminStatsQuery()

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  if (isLoading) {
    return <p>Loading admin dashboard...</p>
  }

  // The `data` property from the RTK Query hook is the entire ApiResponse.
  // The actual stats are inside the `data.data` property.
  const data = adminStats?.data

  if (!data) {
    return <p>No data available for admin dashboard.</p>
  }

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold'>Admin Dashboard</h2>

      <div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
        <h3 className='font-semibold mb-2'>Issues Created Over Time</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data.issuesOverTime || []}>
            <XAxis dataKey='_id' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type='monotone' dataKey='count' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
        <h3 className='font-semibold mb-2'>Issue Status Distribution</h3>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={Object.entries(data.issueStats || {}).map(([k, v]) => ({
                name: k,
                value: v,
              }))}
              dataKey='value'
              nameKey='name'
              outerRadius={100}
              label
            >
              {Object.keys(data.issueStats || {}).map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
        <h3 className='font-semibold mb-2'>Projects - Open/Closed</h3>
        <p>Total: {data.projectSummary?.totalProjects || 0}</p>
        <p>Open: {data.projectSummary?.openProjects || 0}</p>
        <p>Closed: {data.projectSummary?.closedProjects || 0}</p>
      </div>

      <div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
        <h3 className='font-semibold mb-2'>User Roles</h3>
        <ul>
          {Object.entries(data.userRoles || {}).map(([role, count]) => (
            <li key={role}>
              {role}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard
