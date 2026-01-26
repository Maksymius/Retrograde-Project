#!/usr/bin/env python3
"""
Simple AI engine test
"""

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

print("🧪 Testing AI Engine...")
print(f"GEMINI_API_KEY present: {'Yes' if os.getenv('GEMINI_API_KEY') else 'No'}")

try:
    from app.ai_engine import generate_verdict
    
    # Test with simple data
    test_data = {
        "Sun": "Virgo",
        "Moon": "Aquarius",
        "Asc": "Scorpio"
    }
    
    print(f"\n📊 Test data: {test_data}")
    print("🤖 Calling AI engine...")
    
    result = generate_verdict(test_data)
    
    print(f"\n✅ Success!")
    print(f"Verdict: {result['verdict'][:100]}...")
    print(f"Entropy: {result['entropy']}")
    print(f"Case ID: {result['case_id']}")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)