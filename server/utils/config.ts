require('dotenv').config()

const getDatabasesUri = (environment: string | undefined): string => {
  let uri

  if (environment === 'development') {
    uri = process.env.DEVELOPMENT_DB
  }

  if (!uri) {
    console.log('Starting the server failed')
    console.log('Database URI in .env is either invalid or missing')
    process.exit(1)
  }

  return uri
}

const DATABASE_URI = getDatabasesUri(process.env.NODE_ENV)
const PORT = process.env.port || 3001

module.exports = {
  PORT,
  DATABASE_URI,
}
