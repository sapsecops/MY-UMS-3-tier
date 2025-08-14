# Frontend


#### Install NodeJS

```
curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```


#### Install Nginx

```
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```
cd employee_frontend
npm install
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r ~/build/* /var/www/html/

sudo systemctl restart nginx

# Backend

#### Install Maven
```
sudo apt update
sudo apt install -y openjdk-17-jdk maven
java -version
```
```
export MONGO_USER=appuser
export MONGO_PASS=pa55Word
export MONGO_HOST=AWS-DB-Private-IP
export MONGO_DB=employeedb
```

```
mvn clean install
mvn spring-boot:run
```
Run Spring Boot app:
```
nohup java -jar employee-backend-0.0.1-SNAPSHOT.jar > backend.log 2>&1 &
```
Verify backend is running by curling internally or from your local machine:
```
curl http://localhost:8080/api/employees
```


# Docker

## employee_backend/Dockerfile
```
# Use OpenJDK base image
FROM eclipse-temurin:17-jdk-jammy

# Set environment variables for MongoDB - default values used as fallback
ARG MONGO_USER=appuser
ARG MONGO_PASS=pa55Word
ARG MONGO_HOST=AWS-DB-Private-IP
ARG MONGO_DB=employeedb

ENV MONGO_USER=${MONGO_USER}
ENV MONGO_PASS=${MONGO_PASS}
ENV MONGO_HOST=${MONGO_HOST}
ENV MONGO_DB=${MONGO_DB}

# Add Spring Boot jar (ensure jar is built before docker build)
COPY target/employee-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run jar with environment variables passed to Spring Boot
ENTRYPOINT ["sh", "-c", "java -Dspring.data.mongodb.uri=mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=admin -jar /app.jar"]
```

Build command

```
docker build -t employee-backend:latest \
  --build-arg MONGO_USER=appuser \
  --build-arg MONGO_PASS=pa55Word \
  --build-arg MONGO_HOST=AWS-DB-Private-IP \
  --build-arg MONGO_DB=employeedb .
```

Run container 
```
docker run -d -p 8080:8080 \
  -e MONGO_USER=appuser \
  -e MONGO_PASS=pa55Word \
  -e MONGO_HOST=AWS-DB-Private-IP \
  -e MONGO_DB=employeedb \
  --name employee-backend employee-backend:latest
```

## employee_frontend/Dockerfile
```
# Stage 1: build React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./config.js ./config.js
RUN npm run build

# Stage 2: Serve static files with nginx
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
Note => Update src/config.js in React project before building, Make sure your backend URL points to docker network or backend container IP.

Build React Docker image
```
docker build -t employee-frontend:latest .
```
Run th Container
```
docker run -d -p 80:80 --name employee-frontend employee-frontend:latest
```

docker compose
```
version: '3.8'

services:
  backend:
    build:
      context: ./employee_backend
      args:
        MONGO_USER: appuser
        MONGO_PASS: pa55Word
        MONGO_HOST: AWS-DB-Private-IP
        MONGO_DB: employeedb
    environment:
      - MONGO_USER=appuser
      - MONGO_PASS=pa55Word
      - MONGO_HOST=AWS-DB-Private-IP
      - MONGO_DB=employeedb
    ports:
      - "8080:8080"

  frontend:
    build:
      context: ./employee_frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```
Run all:
```
docker-compose up --build -d
```