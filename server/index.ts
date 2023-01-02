import app from './app'
import { PORT } from './utils/config'
import http from 'http'

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export {}
