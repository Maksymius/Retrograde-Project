#!/usr/bin/env python3
"""
Test script for AI Engine
"""

import sys
import os
sys.path.append('app')

from app.ai_engine import generate_verdict, generate_location_error_verdict
from app.astrology import calculate_simple

def test_ai_engine():
    print("🧪 Testing AI Engine...")
    
    # Test 1: Simple astrology data
    print("\n1️⃣ Testing with mock astrology data:")
    mock_astral_data = {
        "Sun": "Gemini",
        "Moon": "Scorpio", 
        "Asc": "Leo"
    }
    
    try:
        result = generate_verdict(mock_astral_data)
        print(f"✅ AI Response: {result}")
    except Exception as e:
        print(f"❌ AI Error: {e}")
    
    # Test 2: Location error
    print("\n2️⃣ Testing location error verdict:")
    try:
        result = generate_location_error_verdict("Невідоме місто")
        print(f"✅ Location Error Response: {result}")
    except Exception as e:
        print(f"❌ Location Error: {e}")
    
    # Test 3: Full astrology calculation
    print("\n3️⃣ Testing full astrology calculation:")
    try:
        astral_data = calculate_simple("Kyiv", "1991-08-24")
        print(f"✅ Astrology Data: {astral_data}")
        
        ai_result = generate_verdict(astral_data)
        print(f"✅ AI Verdict: {ai_result}")
    except Exception as e:
        print(f"❌ Full Test Error: {e}")

if __name__ == "__main__":
    test_ai_engine()