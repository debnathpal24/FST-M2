# Specify base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/app

# WORKDIR means mkdir & cd together

# Copy package.jsondocker  into container
COPY package.json ./

# Install Dependencies
RUN npm install

# Copy the rest of the files
COPY ./ ./

# Startup Command
CMD ["npm", "start"]

