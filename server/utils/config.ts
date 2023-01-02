import * as dotenv from 'dotenv'
dotenv.config()

const getDatabasesUri = (environment: string | undefined): string => {
  let uri

  if (environment === 'development') {
    uri = process.env.DEVELOPMENT_DB
  } else if (environment === 'test') {
    uri = process.env.TEST_DB
  }

  if (!uri) {
    console.log('Starting the server failed')
    console.log('Database URI in .env is either invalid or missing')
    process.exit(1)
  }

  return uri
}

const getPort = (environment: string | undefined): string => {
  let port

  if (environment === 'development') {
    port = process.env.DEV_PORT
  } else if (environment === 'test') {
    port = process.env.TEST_PORT
  }

  if (!port) {
    console.log('Starting the server failed')
    console.log('Port in .env is either invalid or missing')
    process.exit(1)
  }

  return port
}

const DATABASE_URI = getDatabasesUri(process.env.NODE_ENV)
const PORT = process.env.port || getPort(process.env.NODE_ENV)

export { PORT, DATABASE_URI }
