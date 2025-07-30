class ApiError extends Error {
  constructor(statusCode, message = 'Something Went Wrong') {
    super(message)
    this.statusCode = statusCode
    this.success = false
  }
}

export default ApiError
