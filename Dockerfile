# Stage 1: Build Angular application
FROM node:20.11.1-alpine as build
# Set the working directory inside the container
WORKDIR /app
# Copy only necessary files to leverage Docker caching
COPY package.json package-lock.json angular.json ./
# Install the Angular CLI globally
RUN npm install -g @angular/cli@18.2.14
# Install project dependencies
RUN npm install --legacy-peer-deps
# Copy the entire application to the container
COPY . .
# Build the Angular app with production configuration
RUN ng build --configuration=production
# Stage 2: Serve Angular app with NGINX
FROM nginx:alpine
# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy the custom NGINX configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built Angular app to the NGINX HTML directory
COPY --from=build /app/dist/nocodeapi /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Specify the command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
