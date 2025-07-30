import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import issueRoutes from './routes/issue.routes.js'
import testRoutes from './routes/test.routes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/issues', issueRoutes)

app.use('/api/v1/test', testRoutes)

app.use(errorHandler)

export default app
