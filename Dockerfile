# Use an official Node.js runtime as the base image
FROM node:18
# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
