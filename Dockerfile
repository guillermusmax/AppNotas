# Usamos una imagen base de Node.js
FROM node:14

# Establecemos el directorio de trabajo en /app
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json para instalar las dependencias primero
COPY package*.json /app-notas/

# Instalamos las dependencias
RUN npm install 

# Copiamos todos los archivos y carpetas de la aplicación a /app en el contenedor
COPY . .

# Exponemos el puerto 3000 (ajusta el puerto si es necesario)
EXPOSE 3030

# Especificamos el comando para iniciar la aplicación
CMD ["node", "app-notas/app.js"]
