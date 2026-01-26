# Use Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for kerykeion (Swiss Ephemeris)
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/
COPY run_bot.py .

# Expose port (Cloud Run will set PORT env variable)
EXPOSE 8000

# Use environment variable for port (Cloud Run compatibility)
ENV PORT=8000

# Default command (can be overridden in docker-compose)
CMD python -m uvicorn app.main:app --host 0.0.0.0 --port ${PORT}