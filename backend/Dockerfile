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
COPY start.sh .

# Make start script executable
RUN chmod +x start.sh

# Expose port (Cloud Run will override with PORT env variable)
EXPOSE 8080

# Set default PORT for local development
ENV PORT=8000

# Run the application using start script
CMD ["./start.sh"]
