#!/usr/bin/env python3
"""
Test Cloud Run deployment
"""

import requests
import json
import sys

# Замініть на ваш Cloud Run URL
CLOUD_RUN_URL = input("Enter your Cloud Run URL (e.g., https://retrograde-backend-xxx.run.app): ").strip()

if not CLOUD_RUN_URL:
    print("❌ URL is required!")
    sys.exit(1)

print(f"\n🧪 Testing Cloud Run deployment at: {CLOUD_RUN_URL}")

# Test 1: Health check
print("\n1️⃣ Testing health endpoint...")
try:
    response = requests.get(f"{CLOUD_RUN_URL}/api/health", timeout=10)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        print(f"   ✅ Response: {response.json()}")
    else:
        print(f"   ❌ Error: {response.text}")
except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 2: Root endpoint
print("\n2️⃣ Testing root endpoint...")
try:
    response = requests.get(f"{CLOUD_RUN_URL}/", timeout=10)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        print(f"   ✅ Response: {response.json()}")
    else:
        print(f"   ❌ Error: {response.text}")
except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 3: Predict endpoint
print("\n3️⃣ Testing predict endpoint...")
try:
    test_data = {
        "city": "Kyiv",
        "date": "1991-08-24"
    }
    
    print(f"   Request: {json.dumps(test_data)}")
    
    response = requests.post(
        f"{CLOUD_RUN_URL}/api/predict",
        json=test_data,
        headers={"Content-Type": "application/json"},
        timeout=30
    )
    
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✅ Success!")
        print(f"   Status: {data.get('status')}")
        print(f"   Astral data: {data.get('data', {}).get('astral_data')}")
        print(f"   Verdict: {data.get('data', {}).get('verdict', '')[:100]}...")
        print(f"   Entropy: {data.get('data', {}).get('entropy')}")
        print(f"   Case ID: {data.get('data', {}).get('case_id')}")
    else:
        print(f"   ❌ Error: {response.text}")
        
except Exception as e:
    print(f"   ❌ Error: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*50)
print("✅ Testing complete!")
print("="*50)