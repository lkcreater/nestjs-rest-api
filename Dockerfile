# Use an official Node.js runtime as the base image
FROM node:18.12

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose a port (optional)
EXPOSE 3000

# Specify the command to run the application
CMD [ "npm", "run", "start:prod" ]