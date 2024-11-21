# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Stage 2: Package
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 3500

CMD ["npm", "start"]