/* Dependencies */
import express from 'express'
import { engine } from 'express-handlebars';
import hbs from 'handlebars'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import swaggerJSDoc from 'swagger-jsdoc';

/* Access */
import http from 'http'
import path from 'path'

/* Routes */
import mocksRoute from '../routes/mocks.routes.js'
import userRoute from '../routes/users.routes.js'
import viewRoute from '../routes/views.routes.js'
import petRoute from '../routes/pets.routes.js'

/* DB */
import db, { configObjet } from './connection.db.js'

export default class Server {
    constructor() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.port = configObjet.port
        this.apiPaht = {
            mock: '/api/mock',
            pet: '/api/pet',
            user: '/api/user'
        }
        this.viewEngine()
        this.middlewares()
        this.router()
        this.connectDB()
        this.swaggerDocs()
        this.swagger()
    }

    swagger() {
      const swaggerOptions = { 
        definition: {
          openapi: '3.0.1',
          info: {
            title: 'Documentacion de app web de Adopcion de mascotas',
            version: '1.0.0',
            description: 'API de Adopcion de mascotas',
          },
          apis: []
        }
      }
    }
    swaggerDocs() {
        const swaggerDocument = YAML.load(path.resolve('swagger.yaml'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    middlewares() {
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(morgan('combined'));
        this.app.use(express.json({ limit: '50mb' }));      
    }
    
    viewEngine() {
        this.app.engine('.handlebars', engine({ 
            extname: '.handlebars', 
            defaultLayout: 'main' 
        }));
        this.app.set('view engine', '.handlebars');
    
        this.app.set('views', path.resolve('src/views'));  

        hbs.registerHelper('disable-prototype-check', function() {
          this.prototypeAccess = true;
        });

        hbs.create({
          allowProtoPropertiesByDefault: true
        });
    }
    router(){
        this.app.use('/', viewRoute)
        this.app.use(this.apiPaht.pet, petRoute)
        this.app.use(this.apiPaht.mock, mocksRoute)
        this.app.use(this.apiPaht.user, userRoute)
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