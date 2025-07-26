# Dockerfile im frontend/
FROM node:20.11.1-alpine as build
WORKDIR /app
COPY package*.json angular.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration production

FROM alpine:latest
COPY --from=build /app/dist/nocodeapi/browser /dist
