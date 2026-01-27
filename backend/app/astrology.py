from kerykeion import AstrologicalSubjectFactory, ChartDataFactory
from datetime import datetime
from typing import Dict, Optional, List

# Mapping short names to full zodiac signs
ZODIAC_MAPPING = {
    'Ari': 'Aries',
    'Tau': 'Taurus', 
    'Gem': 'Gemini',
    'Can': 'Cancer',
    'Leo': 'Leo',
    'Vir': 'Virgo',
    'Lib': 'Libra',
    'Sco': 'Scorpio',
    'Sag': 'Sagittarius',
    'Cap': 'Capricorn',
    'Aqu': 'Aquarius',
    'Pis': 'Pisces'
}

def get_planet_data(subject) -> list:
    """
    Extract planet positions with degrees for radar chart.
    Returns list of dicts with name, deg (absolute position), and color.
    """
    planets_data = []
    
    # Define planets with their colors (cyberpunk theme)
    planet_config = [
        ("sun", "SUN", "#FFB000"),      # Yellow
        ("moon", "MOON", "#E0E0E0"),    # White
        ("mercury", "MERC", "#00FF41"), # Green
        ("venus", "VEN", "#FF3399"),    # Pink
        ("mars", "MARS", "#FF3333"),    # Red
        ("jupiter", "JUP", "#9D00FF"),  # Purple
        ("saturn", "SAT", "#555555"),   # Gray
    ]
    
    for attr_name, display_name, color in planet_config:
        if hasattr(subject, attr_name):
            planet = getattr(subject, attr_name)
            if hasattr(planet, 'abs_pos'):
                planets_data.append({
                    "name": display_name,
                    "deg": round(planet.abs_pos, 2),
                    "color": color
                })
    
    return planets_data

def calculate_simple(city: str, date_str: str) -> Dict:
    """
    Calculate basic astrology data using kerykeion 5.7.0.
    Returns dict with signs and chart_data for radar visualization.
    """
    try:
        # Parse date string (format: "1991-08-24")
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        
        # Create astrological subject using new factory
        subject = AstrologicalSubjectFactory.from_birth_data(
            name="User",
            year=date_obj.year,
            month=date_obj.month,
            day=date_obj.day,
            hour=12,  # Default noon
            minute=0,
            city=city,
            nation="UA"  # Default to Ukraine
        )
        
        # Extract basic planetary positions directly from subject
        astral_data = {}
        
        # Get Sun, Moon, Ascendant with full names
        if hasattr(subject, 'sun') and hasattr(subject.sun, 'sign'):
            short_sign = subject.sun.sign
            astral_data['Sun'] = ZODIAC_MAPPING.get(short_sign, short_sign)
            
        if hasattr(subject, 'moon') and hasattr(subject.moon, 'sign'):
            short_sign = subject.moon.sign
            astral_data['Moon'] = ZODIAC_MAPPING.get(short_sign, short_sign)
            
        # Get Ascendant
        if hasattr(subject, 'first_house') and hasattr(subject.first_house, 'sign'):
            short_sign = subject.first_house.sign
            astral_data['Asc'] = ZODIAC_MAPPING.get(short_sign, short_sign)
            
        # Fallback if we couldn't get all data
        if len(astral_data) < 2:
            raise Exception("Insufficient astral data calculated")
        
        # Add chart data for radar visualization
        astral_data['chart_data'] = get_planet_data(subject)
            
        return astral_data
        
    except Exception as e:
        print(f"Astrology calculation error: {e}")
        # Return error that AI can work with
        raise Exception(f"ASTRAL_CALCULATION_FAILED: {str(e)}")

def test_astrology():
    """Test function to verify astrology calculations work"""
    try:
        result = calculate_simple("Kyiv", "1991-08-24")
        print(f"Test result: {result}")
        return result
    except Exception as e:
        print(f"Test failed: {e}")
        return None

if __name__ == "__main__":
    test_astrology()