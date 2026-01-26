#!/usr/bin/env python3
"""
Test API endpoint
"""

import requests
import json

def test_api():
    print("🧪 Testing API endpoint...")
    
    # Test data
    test_data = {
        "city": "Kyiv",
        "date": "1991-08-24"
    }
    
    try:
        # Make request to local API
        response = requests.post(
            "http://localhost:8000/api/predict",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Response:")
            print(json.dumps(data, indent=2, ensure_ascii=False))
        else:
            print(f"❌ API Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure API server is running on localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_api()