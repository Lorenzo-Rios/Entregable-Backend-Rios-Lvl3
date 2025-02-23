  /* Dependencies */
  import express from 'express'
  import { engine } from 'express-handlebars';
  import hbs from 'handlebars'
  import cors from 'cors'
  import morgan from 'morgan'
  import YAML from 'yamljs';
  import swaggerUi from 'swagger-ui-express';
  import swaggerJSDoc from 'swagger-jsdoc';
  import swaggerOptions from '../config/swaggerConfig.js';

  /* Access */
  import { __dirname } from '../utils/dirname.js';
  import http from 'http'
  import path from 'path'

  /* Routes */
  import mocksRoute from '../routes/mocks.routes.js'
  import userRoute from '../routes/users.routes.js'
  import viewRoute from '../routes/views.routes.js'
  import petRoute from '../routes/pets.routes.js'
  import sessionRoute from '../routes/sessions.routes.js'
  import adoptionRoute from '../routes/adoptions.routes.js'

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
              user: '/api/user',
              session: '/api/session',
              adoption: '/api/adoption',
          }
          this.viewEngine()
          this.middlewares()
          this.router()
          this.connectDB()
          this.swagger()
      }

      swagger() {
        const swaggerDocs = swaggerJSDoc(swaggerOptions); // Usa swagger-jsdoc para generar la documentación desde la configuración
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Expone Swagger UI en /api-docs
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
        this.app.use(this.apiPaht.session, sessionRoute)
        this.app.use(this.apiPaht.adoption, adoptionRoute)
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