#!/bin/bash

echo "🔧 Checking environment variables..."
echo ""

gcloud run services describe retrograde-back \
  --platform managed \
  --region europe-west4 \
  --format='value(spec.template.spec.containers[0].env)'