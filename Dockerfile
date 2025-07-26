FROM node:20.11.1-alpine as build
WORKDIR /app
COPY package*.json angular.json ./
RUN npm install -g @angular/cli@18.2.14
RUN npm install --legacy-peer-deps
COPY . .
RUN ng build --configuration=production
scp -r ./dist/nocodeapi/browser/* root@empleo.at:/usr/share/nginx/html/
