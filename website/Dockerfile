# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]