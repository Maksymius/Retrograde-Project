#!/bin/bash

echo "📋 Checking Cloud Run logs for retrograde-back..."
echo ""

gcloud run services logs read retrograde-back \
  --platform managed \
  --region europe-west4 \
  --limit 50 \
  --format="table(timestamp,severity,textPayload)"