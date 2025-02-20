import Server from './server/server.js'

const server = new Server()

export const app = server.app;

server.listen()