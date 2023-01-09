class CustomError extends Error {
  statusCode: number
  type: string

  constructor(message: string, type: string, statusCode: number) {
    super(message)
    this.type = type
    this.statusCode = statusCode
  }
}

export { CustomError }
