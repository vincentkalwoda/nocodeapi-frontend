# Dockerfile im frontend/
FROM node:20.11.1-alpine as build
WORKDIR /app
COPY package.json package-lock.json angular.json ./
RUN npm install -g @angular/cli@18.2.14
RUN npm install --legacy-peer-deps
COPY . .
RUN ng build --configuration=production
FROM alpine:latest
COPY --from=build /app/dist/nocodeapi/browser /dist
