# Use an official Node.js runtime as the base image
FROM node:18
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install app dependencies
RUN npm install --force
# Copy the rest of the app source code to the container
COPY . .
# Expose port 3000 for the React app
EXPOSE 3000
# Start the React app
CMD ["npm", "start"]