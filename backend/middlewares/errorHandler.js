import ApiError from '../utils/ApiError.js'

export default (err, req, res, next) => {
  const status = err.statusCode || 500
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
