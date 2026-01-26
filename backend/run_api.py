#!/usr/bin/env python3
"""
Run API server
"""

import sys
import os
sys.path.append('app')

import uvicorn

if __name__ == "__main__":
    print("🚀 Starting Retrograde Department API...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)