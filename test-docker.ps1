Write-Host "Testing Docker Compose Setup..." -ForegroundColor Green

# Check if Docker is running
Write-Host "Checking Docker status..." -ForegroundColor Yellow
docker --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker is not installed or not running" -ForegroundColor Red
    exit 1
}

# Build and start services
Write-Host "Building and starting services..." -ForegroundColor Yellow
docker-compose up --build -d

# Wait a moment for services to start
Write-Host "Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Test backend
Write-Host "Testing backend GraphQL endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/graphql" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"query":"query { getAllTasks { id title description status } }"}' -TimeoutSec 10
    Write-Host "Backend is responding: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Backend test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test frontend
Write-Host "Testing frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 10
    Write-Host "Frontend is responding: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Frontend test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Docker Compose test completed!" -ForegroundColor Green
Write-Host "You can access:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "- Backend GraphQL: http://localhost:5000/graphql" -ForegroundColor Cyan
