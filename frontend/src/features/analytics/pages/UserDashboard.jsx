import {
  useGetStatusStatsQuery,
  useGetTimelineStatsQuery,
} from '../analyticsApi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const UserDashboard = () => {
  const { data: statusStats, isLoading: isStatusLoading } =
    useGetStatusStatsQuery()
  const { data: timelineStats, isLoading: isTimelineLoading } =
    useGetTimelineStatsQuery()

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658']

  if (isStatusLoading || isTimelineLoading) {
    return <p>Loading user dashboard...</p>
  }

  // The backend's issueStatusStats returns a key-value object directly.
  // The API response wraps this in a `data` property.
  const statusData = statusStats?.data || {}

  // The backend's issueTimeSeriesStats returns an array of objects directly.
  // The API response wraps this in a `data` property.
  const timelineData = timelineStats?.data || []

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold'>User Dashboard</h2>

      <div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
        <h3 className='font-semibold mb-2'>Your Issue Status</h3>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={Object.entries(statusData).map(([k, v]) => ({
                name: k,
                value: v,
              }))}
              dataKey='value'
              nameKey='name'
              outerRadius={100}
              label
            >
              {Object.keys(statusData).map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
        <h3 className='font-semibold mb-2'>Your Issues Over Time</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={timelineData}>
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type='monotone' dataKey='count' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default UserDashboard
