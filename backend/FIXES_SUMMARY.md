# 🔧 Виправлення для Cloud Run Deployment

## Проблеми та рішення

### 1. ❌ "is a directory" помилка
**Проблема**: Docker не міг знайти Dockerfile
**Рішення**: 
- Використовуємо `backend/` як build context
- Вказуємо `-f backend/Dockerfile` для шляху до файлу
- В `cloudbuild.yaml`: `dir: 'backend'` + правильні шляхи

### 2. ❌ "ModuleNotFoundError: No module named 'astrology'"
**Проблема**: Неправильні імпорти в `main.py`
**Рішення**:
```python
# Було:
from astrology import calculate_simple
from ai_engine import generate_verdict

# Стало:
from .astrology import calculate_simple
from .ai_engine import generate_verdict
```

### 3. ⚙️ PORT environment variable
**Проблема**: Cloud Run встановлює динамічний PORT
**Рішення**:
- Додано `start.sh` скрипт для обробки PORT
- Dockerfile використовує `CMD ["./start.sh"]`
- Видалено `--port` з cloudbuild.yaml (Cloud Run встановить автоматично)

## Файли, що були змінені

### backend/Dockerfile
```dockerfile
# Чистий, оптимізований Dockerfile
FROM python:3.11-slim
WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y gcc g++ && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Application code
COPY app/ ./app/
COPY run_bot.py .
COPY start.sh .
RUN chmod +x start.sh

# Port configuration
EXPOSE 8080
ENV PORT=8000

# Start
CMD ["./start.sh"]
```

### backend/start.sh
```bash
#!/bin/bash
PORT=${PORT:-8000}
echo "🚀 Starting on port $PORT..."
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### backend/app/main.py
```python
# Виправлені імпорти
from .astrology import calculate_simple
from .ai_engine import generate_verdict, generate_location_error_verdict
```

### cloudbuild.yaml
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/retrograde-backend:$COMMIT_SHA'
      - '-f'
      - 'backend/Dockerfile'
      - 'backend'  # Build context
```

## Нові файли

- `.dockerignore` - оптимізація Docker build
- `.gcloudignore` - оптимізація Cloud Build
- `start.sh` - обробка PORT змінної
- `test-docker-quick.sh` - швидке тестування

## Тестування

### Локально
```bash
cd backend
./test-docker-quick.sh
```

### Cloud Build
```bash
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions _GEMINI_API_KEY="your-key",_FRONTEND_URL="https://your-frontend.vercel.app"
```

## Перевірка після деплою

```bash
# Отримати URL
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'

# Тест health
curl https://your-url.run.app/api/health

# Тест predict
curl -X POST https://your-url.run.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{"city": "Kyiv", "date": "1991-08-24"}'
```

## Статус

✅ Dockerfile оптимізовано
✅ Імпорти виправлено
✅ PORT обробляється правильно
✅ Build context налаштовано
✅ CORS налаштовано для production
✅ Документація оновлена

## Наступні кроки

1. Закомітити зміни
2. Запушити до GitHub
3. Cloud Build автоматично задеплоїть
4. Перевірити URL сервісу
5. Оновити frontend з новим API URL