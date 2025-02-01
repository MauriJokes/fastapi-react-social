# Use official Node.js image with Yarn pre-installed
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock before running install
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
