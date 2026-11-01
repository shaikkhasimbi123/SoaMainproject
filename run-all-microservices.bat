@echo off
title AcademiaX Microservices Launcher
cd /d "%~dp0"

echo =========================================================
echo Launching AcademiaX Spring Boot Microservices
echo =========================================================

echo 1. Starting Eureka Discovery Server on Port 8761...
start "Eureka Server (8761)" cmd /k "cd backend\eureka-server && mvn spring-boot:run"

timeout /t 10 /nobreak >nul

echo 2. Starting API Gateway on Port 8080...
start "API Gateway (8080)" cmd /k "cd backend\api-gateway && mvn spring-boot:run"

echo 3. Starting Auth Service on Port 8081...
start "Auth Service (8081)" cmd /k "cd backend\auth-service && mvn spring-boot:run"

echo 4. Starting Course Service on Port 8082...
start "Course Service (8082)" cmd /k "cd backend\course-service && mvn spring-boot:run"

echo 5. Starting Enrollment Service on Port 8083...
start "Enrollment Service (8083)" cmd /k "cd backend\enrollment-service && mvn spring-boot:run"

echo 6. Starting Payment & DTI Service on Port 8084...
start "Payment & DTI Service (8084)" cmd /k "cd backend\payment-dti-service && mvn spring-boot:run"

echo =========================================================
echo All microservices launched in separate terminals!
echo Open Eureka Dashboard: http://localhost:8761
echo Open API Gateway Health: http://localhost:8080/api/health
echo =========================================================
pause
