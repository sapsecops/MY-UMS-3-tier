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