#!/usr/bin/env python3
"""
Telegram Bot Runner for Retrograde Department
"""

import sys
import os

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.telegram_bot import main
import asyncio

if __name__ == "__main__":
    print("🚀 Starting Retrograde Department Telegram Bot...")
    asyncio.run(main())