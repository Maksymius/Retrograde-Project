#!/usr/bin/env python3
"""
Check available Gemini models
"""

import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def check_models():
    print("🔍 Checking available Gemini models...")
    
    try:
        models = genai.list_models()
        print(f"\n📋 Available models:")
        
        for model in models:
            print(f"  - {model.name}")
            if hasattr(model, 'supported_generation_methods'):
                print(f"    Methods: {model.supported_generation_methods}")
        
        # Test specific models
        test_models = ['gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-pro-latest']
        
        print(f"\n🧪 Testing models:")
        for model_name in test_models:
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content("Test message")
                print(f"  ✅ {model_name}: Working")
            except Exception as e:
                print(f"  ❌ {model_name}: {e}")
                
    except Exception as e:
        print(f"❌ Error checking models: {e}")

if __name__ == "__main__":
    check_models()