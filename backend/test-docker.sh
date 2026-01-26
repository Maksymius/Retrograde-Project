#!/bin/bash

# Test Docker build and run locally
echo "🐳 Testing Docker build..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Build image
echo "📦 Building Docker image..."
docker build -t retrograde-backend:test .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Docker build successful!"

# Stop any existing container
echo "🛑 Stopping existing container..."
docker stop retrograde-backend-test 2>/dev/null || true
docker rm retrograde-backend-test 2>/dev/null || true

# Run container
echo "🚀 Starting container..."
docker run -d \
    --name retrograde-backend-test \
    -p 8080:8000 \
    -e GEMINI_API_KEY="$GEMINI_API_KEY" \
    -e FRONTEND_URL="$FRONTEND_URL" \
    retrograde-backend:test

if [ $? -ne 0 ]; then
    echo "❌ Docker run failed!"
    exit 1
fi

echo "✅ Container started!"
echo ""
echo "🧪 Testing API..."
sleep 3

# Test health endpoint
HEALTH_RESPONSE=$(curl -s http://localhost:8080/api/health)
echo "Health check: $HEALTH_RESPONSE"

# Test predict endpoint
echo ""
echo "Testing predict endpoint..."
PREDICT_RESPONSE=$(curl -s -X POST http://localhost:8080/api/predict \
    -H "Content-Type: application/json" \
    -d '{"city": "Kyiv", "date": "1991-08-24"}')

echo "Predict response: $PREDICT_RESPONSE"

echo ""
echo "✅ All tests passed!"
echo ""
echo "📋 Container logs:"
docker logs retrograde-backend-test --tail 20

echo ""
echo "🛑 To stop the container: docker stop retrograde-backend-test"
echo "📊 To view logs: docker logs -f retrograde-backend-test"