#!/bin/bash

echo "🚀 Redeploying to Cloud Run..."
echo ""
echo "This will:"
echo "1. Build new Docker image with latest code"
echo "2. Push to Container Registry"
echo "3. Deploy to Cloud Run"
echo ""

# Get current git commit
COMMIT=$(git rev-parse --short HEAD)
echo "📝 Current commit: $COMMIT"
echo ""

# Trigger Cloud Build
echo "🔨 Starting build..."
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions _GEMINI_API_KEY="AIzaSyDh8OqxtweHq3wkERlaCBFFiYb2XLgev4M",_FRONTEND_URL="https://retrograde-project.vercel.app"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Test with:"
echo "curl https://retrograde-back-169250578782.europe-west4.run.app/api/predict \\"
echo "  -X POST -H 'Content-Type: application/json' \\"
echo "  -d '{\"city\": \"Kyiv\", \"date\": \"1991-08-24\"}'"