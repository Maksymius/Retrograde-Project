# Retrograde Department Backend

FastAPI backend для астрологічних розрахунків та AI вердиктів.

## 🚀 Швидкий старт

### Локальна розробка

```bash
# Встановіть залежності
pip install -r requirements.txt

# Налаштуйте .env файл
cp .env.example .env
# Додайте ваш GEMINI_API_KEY

# Запустіть API сервер
python run_api.py

# Або через uvicorn
uvicorn app.main:app --reload
```

API буде доступний на `http://localhost:8000`

### Docker

```bash
# Збудуйте image
docker build -t retrograde-backend .

# Запустіть container
docker run -p 8000:8000 \
  -e GEMINI_API_KEY="your-key" \
  retrograde-backend

# Або використайте docker-compose
docker-compose up
```

### Тестування

```bash
# Тест Docker збірки
./test-docker.sh

# Тест AI engine
python test_ai.py

# Тест API
python test_api.py

# Перевірка доступних моделей
python check_models.py
```

## 📡 API Endpoints

### Health Check
```bash
GET /api/health
```

### Predict
```bash
POST /api/predict
Content-Type: application/json

{
  "city": "Kyiv",
  "date": "1991-08-24"
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "astral_data": {
      "Sun": "Virgo",
      "Moon": "Aquarius",
      "Asc": "Scorpio"
    },
    "verdict": "Згідно з протоколом Сатурна №404...",
    "entropy": "CRITICAL",
    "case_id": "RD-404-VIRGO"
  }
}
```

## 🤖 Telegram Bot

```bash
# Запустіть бота
python run_bot.py
```

Детальні інструкції: [TELEGRAM_BOT_SETUP.md](TELEGRAM_BOT_SETUP.md)

## ☁️ Деплой

### Google Cloud Run

Детальні інструкції: [DEPLOY_GOOGLE_CLOUD.md](DEPLOY_GOOGLE_CLOUD.md)

Швидкий деплой:
```bash
gcloud builds submit --config cloudbuild.yaml
```

### Vercel / Railway / Render

Backend можна задеплоїти на будь-який сервіс, що підтримує Docker або Python.

## 🔧 Конфігурація

### Змінні середовища

- `GEMINI_API_KEY` - API ключ для Google Gemini (обов'язково)
- `FRONTEND_URL` - URL frontend додатку для CORS
- `TELEGRAM_BOT_TOKEN` - Токен Telegram бота (опціонально)
- `WEBAPP_URL` - URL WebApp для Telegram бота
- `PORT` - Порт для API сервера (за замовчуванням 8000)

### Requirements

- Python 3.11+
- FastAPI
- Uvicorn
- Kerykeion (астрологічні розрахунки)
- Google Generative AI (Gemini)
- Aiogram (Telegram bot)

## 📁 Структура

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI додаток
│   ├── ai_engine.py      # AI вердикти
│   ├── astrology.py      # Астрологічні розрахунки
│   └── telegram_bot.py   # Telegram бот
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── run_api.py           # Запуск API
├── run_bot.py           # Запуск бота
└── cloudbuild.yaml      # Google Cloud Build
```

## 🐛 Troubleshooting

### AI не відповідає

Перевірте доступні моделі:
```bash
python check_models.py
```

### CORS помилки

Додайте ваш frontend URL до `allow_origins` в `app/main.py`

### Docker помилки

Перевірте логи:
```bash
docker logs container-name
```

## 📝 License

MIT