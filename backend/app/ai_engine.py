import google.generativeai as genai
import json
import os
from typing import Dict, Optional

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
Ти — ШІ-Оракул Департаменту Ретроградності. Твоя робота — не втішати, а констатувати факти.
Твій стиль — це суміш Леся Подерв'янського (інтелектуальна сатира) та нудного бюрократа з "Дюни".

ПРАВИЛА:
1. Не використовуй фрази "Зірки радять". Заміни на "Згідно з протоколом Сатурна №404".
2. Якщо у юзера Сонце в Рибах — звинувачуй його в "надмірній вологості характеру".
3. Якщо Марс у Овні — діагностуй "синдром неконтрольованої агресії приматів".
4. Твій висновок має бути коротким (до 4 речень), нищівним, але смішним.
5. Обов'язково вигадай bureaucratic case_id у форматі "RD-XXX-ЗНАК".
6. Entropy має бути одним з: LOW, MEDIUM, HIGH, CRITICAL, CATASTROPHIC.

Відповідай ТІЛЬКИ у форматі JSON:
{
  "verdict": "твій жорсткий вирок українською",
  "entropy": "CRITICAL", 
  "case_id": "RD-404-VIRGO"
}
"""

def generate_verdict(astral_data: Dict[str, str]) -> Dict[str, str]:
    """
    Generate AI verdict based on astrology data.
    Returns structured response with verdict, entropy, case_id.
    """
    try:
        # Try available model names in order of preference
        model_names = ['gemini-2.5-flash', 'gemini-pro-latest', 'gemini-2.5-pro']
        
        model = None
        for model_name in model_names:
            try:
                model = genai.GenerativeModel(model_name)
                print(f"Using model: {model_name}")
                break
            except Exception as e:
                print(f"Failed to load model {model_name}: {e}")
                continue
        
        if not model:
            raise Exception("No available Gemini models found")
        
        # Prepare prompt with astral data
        user_prompt = f"""
        Астрологічні дані користувача:
        {json.dumps(astral_data, ensure_ascii=False)}
        
        Згенеруй вирок Департаменту Ретроградності для цих планетарних позицій.
        """
        
        # Generate response
        response = model.generate_content([
            {"role": "user", "parts": [SYSTEM_PROMPT]},
            {"role": "user", "parts": [user_prompt]}
        ])
        
        # Parse JSON response
        response_text = response.text.strip()
        print(f"Raw AI response: {response_text}")
        
        # Clean up response (remove markdown formatting if present)
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        
        verdict_data = json.loads(response_text)
        
        # Validate required fields
        required_fields = ["verdict", "entropy", "case_id"]
        for field in required_fields:
            if field not in verdict_data:
                raise Exception(f"Missing required field: {field}")
        
        return verdict_data
        
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        return generate_fallback_verdict(astral_data)
    except Exception as e:
        print(f"AI generation error: {e}")
        return generate_fallback_verdict(astral_data)

def generate_fallback_verdict(astral_data: Dict[str, str]) -> Dict[str, str]:
    """
    Fallback verdict when AI is unavailable.
    """
    sun_sign = astral_data.get('Sun', 'UNKNOWN')
    
    fallback_verdicts = {
        'Aries': "Виявлено надлишок первісної агресії. Департамент рекомендує терапію холодним душем.",
        'Taurus': "Зафіксовано критичну інертність мислення. Прогноз: стагнація до кінця циклу.",
        'Gemini': "Діагностовано розщеплення особистості на рівні квантів. Лікування неможливе.",
        'Cancer': "Виявлено емоційну нестабільність планетарного масштабу. Ізоляція рекомендована.",
        'Leo': "Зафіксовано мегаломанію з ознаками сонячного затемнення. Критичний стан его.",
        'Virgo': "Виявлено перфекціонізм, що загрожує структурі реальності. Негайна деградація показана.",
        'Libra': "Діагностовано хронічну нерішучість. Всесвіт втомився чекати ваших рішень.",
        'Scorpio': "Зафіксовано токсичність на молекулярному рівні. Карантин до подальших розпоряджень.",
        'Sagittarius': "Виявлено синдром вічного мандрівника. Лікування: прив'язати до стільця.",
        'Capricorn': "Діагностовано трудоголізм з летальним прогнозом. Відпочинок заборонений.",
        'Aquarius': "Зафіксовано відчуження від реальності. Пацієнт живе у власному всесвіті.",
        'Pisces': "Виявлено надмірну вологість характеру. Рекомендується дегідратація."
    }
    
    verdict = fallback_verdicts.get(sun_sign, "Невідомий астральний збій. Департамент в розгубленості.")
    
    return {
        "verdict": verdict,
        "entropy": "HIGH",
        "case_id": f"RD-FALLBACK-{sun_sign.upper()}"
    }

def generate_location_error_verdict(city: str) -> Dict[str, str]:
    """
    Generate verdict for unknown/invalid locations.
    """
    return {
        "verdict": f"Місто '{city}' не існує в офіційних картах Всесвіту. Департамент підозрює спробу обману космічних сил. Рекомендується перевірка на існування.",
        "entropy": "CATASTROPHIC",
        "case_id": f"RD-404-LOCATION"
    }

def test_ai():
    """Test AI generation"""
    test_data = {"Sun": "Virgo", "Moon": "Leo", "Asc": "Scorpio"}
    result = generate_verdict(test_data)
    print(f"AI Test result: {result}")
    return result

if __name__ == "__main__":
    test_ai()