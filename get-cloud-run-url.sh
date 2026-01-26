#!/bin/bash

echo "🔍 Getting Cloud Run URL..."
echo ""

URL=$(gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format='value(status.url)' 2>/dev/null)

if [ -z "$URL" ]; then
    echo "❌ Service not found or not deployed yet"
    echo ""
    echo "Deploy first with:"
    echo "  gcloud builds submit --config cloudbuild.yaml"
    exit 1
fi

echo "✅ Cloud Run URL:"
echo ""
echo "  $URL"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Add to Vercel environment variables:"
echo "   NEXT_PUBLIC_API_URL=$URL"
echo ""
echo "2. Test the API:"
echo "   curl $URL/api/health"
echo ""
echo "3. Or run the test script:"
echo "   cd backend && python3 test_cloud_run.py"
echo ""