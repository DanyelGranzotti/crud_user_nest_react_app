# syntax=docker/dockerfile:1.3-labs
# Enable Docker BuildKit
# Use a lightweight Node.js image for building
FROM node:22.13.0-alpine AS build

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# Use a lightweight Nginx image for serving
FROM nginx:1.25.2-alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
