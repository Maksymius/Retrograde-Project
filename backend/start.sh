#!/bin/bash

# Start script for Cloud Run
# Handles PORT environment variable properly

# Set default port if not provided
PORT=${PORT:-8000}

echo "🚀 Starting Retrograde Department API on port $PORT..."

# Start uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT