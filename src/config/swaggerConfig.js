import { __dirname } from "../utils/dirname.js";

const swaggerOptions = { 
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion de app web de Adopcion de mascotas',
      version: '1.0.0',
      description: 'API de Adopcion de mascotas',
    },
  },
  // Aquí ajustamos la ruta, subimos dos directorios para salir de src/config y acceder a docs
  apis: [`${__dirname}/../docs/**/*.yaml`]
}

export default swaggerOptions;