#!/bin/bash

# Check Cloud Run logs
echo "📋 Checking Cloud Run logs..."

SERVICE_NAME="retrograde-backend"
REGION="us-central1"

# Get service info
echo ""
echo "🔍 Service info:"
gcloud run services describe $SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --format="table(status.url,status.conditions[0].status,status.conditions[0].message)"

# Get URL
echo ""
echo "🌐 Service URL:"
gcloud run services describe $SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --format='value(status.url)'

# Get recent logs
echo ""
echo "📜 Recent logs (last 50 lines):"
gcloud run services logs read $SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --limit 50

# Get error logs only
echo ""
echo "❌ Error logs:"
gcloud run services logs read $SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --limit 20 \
  --log-filter='severity>=ERROR'

# Get environment variables
echo ""
echo "🔧 Environment variables:"
gcloud run services describe $SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --format='value(spec.template.spec.containers[0].env)'