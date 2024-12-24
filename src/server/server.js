/* Dependencies */
import express from 'express'

/* Access */
import http from 'http'
import path from 'path'

/* Routes */
import mocksRoute from '../routes/mocks.routes.js'

/* DB */
import db, { configObjet } from './connection.db.js'

export default class Server {
    constructor() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.port = configObjet.port
        this.apiPaht = {
            mock: '/api/mock'
        }

        this.router()
        this.connectDB()
    }

    router(){
        this.app.use(this.apiPaht.mock, mocksRoute)
    }

    connectDB() {
        db()
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`)
        })
    }
}