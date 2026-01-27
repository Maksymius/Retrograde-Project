#!/usr/bin/env python3
"""
Quick test script to verify the radar chart data is returned correctly
"""

from app.astrology import calculate_simple
import json

def test_radar_data():
    print("🧪 Testing Astro Radar API Response\n")
    print("=" * 60)
    
    # Test with sample data
    test_cases = [
        ("Kyiv", "1991-08-24"),
        ("Lviv", "1995-03-15"),
        ("Odesa", "2000-12-31"),
    ]
    
    for city, date in test_cases:
        print(f"\n📍 Testing: {city}, {date}")
        print("-" * 60)
        
        try:
            result = calculate_simple(city, date)
            
            # Check if chart_data exists
            if 'chart_data' in result:
                print(f"✅ chart_data found with {len(result['chart_data'])} planets")
                
                # Display each planet
                for planet in result['chart_data']:
                    print(f"   {planet['name']:6} → {planet['deg']:6.2f}° ({planet['color']})")
                
                # Check data structure
                print(f"\n📊 Astral Signs:")
                print(f"   Sun: {result.get('Sun', 'N/A')}")
                print(f"   Moon: {result.get('Moon', 'N/A')}")
                print(f"   Asc: {result.get('Asc', 'N/A')}")
                
            else:
                print("❌ chart_data NOT found in response!")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print("\n" + "=" * 60)
    print("✅ Test complete!")

if __name__ == "__main__":
    test_radar_data()
