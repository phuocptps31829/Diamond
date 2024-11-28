# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --force
RUN npm install -g expo-cli

# Install Expo CLI globally
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD [ "npx", "expo", "start" ]


