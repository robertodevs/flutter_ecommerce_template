# Usa una imagen base de Node.js LTS (long-term support)
FROM node:20.14.0

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto en el que la aplicación escucha
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
