# syntax=docker/dockerfile:1.3-labs
# Enable Docker BuildKit
# Use a lightweight Node.js image for building
FROM node:22.13.0-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --frozen-lockfile
RUN npm install -g @nestjs/cli

COPY . .
RUN npm run build

# Use a lightweight Node.js image for running
FROM node:22.13.0-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --only=production --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
