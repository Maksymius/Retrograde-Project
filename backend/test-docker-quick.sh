#!/bin/bash

# Quick Docker test
echo "🐳 Quick Docker test..."

# Build
echo "📦 Building..."
docker build -t retrograde-test . || exit 1

# Run
echo "🚀 Running..."
docker run -d --name retrograde-test -p 8080:8000 \
  -e GEMINI_API_KEY="${GEMINI_API_KEY}" \
  retrograde-test

# Wait
sleep 3

# Test
echo "🧪 Testing..."
curl -s http://localhost:8080/api/health || echo "❌ Failed"

# Cleanup
docker stop retrograde-test && docker rm retrograde-test

echo "✅ Done!"