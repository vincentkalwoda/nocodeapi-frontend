# Stage 1: Build Angular App
FROM node:20.11.1-alpine as build
WORKDIR /app

COPY package.json package-lock.json angular.json ./
RUN npm install -g @angular/cli@18.2.14
RUN npm install --legacy-peer-deps

COPY . .

# Add logging of output
RUN ng build --configuration=production \
  && echo "Build succeeded" > /app/build.log \
  && ls -lh /app/dist/nocodeapi >> /app/build.log \
  || (echo "BUILD FAILED" > /app/build.log && exit 1)

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build log
COPY --from=build /app/build.log /usr/share/nginx/html/build.log

# Copy compiled Angular app
COPY --from=build /app/dist/nocodeapi /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
