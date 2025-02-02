# Usa una imagen base de Node.js
FROM node:22-alpine
 
# Crea el directorio de trabajo
WORKDIR /app
 
# Copia los archivos de la aplicación
COPY package*.json ./
 
# Instala las dependencias
RUN npm install
 
RUN npm cache clean --force
ENV NPM_CONFIG_LOGLEVEL=error
RUN npm install -g @angular/cli@16.2.16
 
# Instalación de herramientas necesarias para dependencias nativas
RUN apk add --no-cache git python3 make g++

 
# Copia el resto del código de la aplicación
COPY . .
 
# Expone el puerto 4200
EXPOSE 4200
 
# Comando para iniciar la aplicación
CMD ["npm", "run", "start", "--", "--host=0.0.0.0", "--port=4200"]
