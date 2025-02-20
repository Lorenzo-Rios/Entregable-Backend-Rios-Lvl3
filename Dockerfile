# Usamos la imagen oficial de Node.js como base
FROM node:18

# Definimos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json antes de instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install --omit=dev

# Copiamos el resto de los archivos del proyecto
COPY . .

# Exponemos el puerto que usa la app
EXPOSE 8081

# Comando para ejecutar la aplicación
CMD ["npm", "start"]