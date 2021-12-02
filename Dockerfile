# Desde docker hub node v 16
FROM node:16

# Working direcotry
WORKDIR /app

# Copiar todo al directorio de trabajo
COPY package*.json ./

# Ejecutar 

RUN npm install 

# Copiar todos los archivos dentro del contenedor

COPY . .

# Ejecutar proyecto

CMD ["npm", "start"]



