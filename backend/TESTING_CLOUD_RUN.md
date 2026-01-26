# 🧪 Тестування Cloud Run Deployment

## Швидка перевірка

### 1. Отримати URL сервісу

```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format='value(status.url)'
```

Або відкрийте: https://console.cloud.google.com/run

### 2. Тест через curl

```bash
# Замініть YOUR_URL на ваш Cloud Run URL
export CLOUD_RUN_URL="https://retrograde-backend-xxx.run.app"

# Health check
curl $CLOUD_RUN_URL/api/health

# Predict
curl -X POST $CLOUD_RUN_URL/api/predict \
  -H "Content-Type: application/json" \
  -d '{"city": "Kyiv", "date": "1991-08-24"}'
```

### 3. Тест через Python скрипт

```bash
cd backend
python3 test_cloud_run.py
# Введіть ваш Cloud Run URL коли запитає
```

## Перевірка логів

### Через скрипт (рекомендовано)

```bash
cd backend
./check_cloud_run_logs.sh
```

### Через gcloud

```bash
# Останні логи
gcloud run services logs read retrograde-backend \
  --platform managed \
  --region us-central1 \
  --limit 50

# Тільки помилки
gcloud run services logs read retrograde-backend \
  --platform managed \
  --region us-central1 \
  --limit 20 \
  --log-filter='severity>=ERROR'

# Логи в реальному часі
gcloud run services logs tail retrograde-backend \
  --platform managed \
  --region us-central1
```

## Типові проблеми та рішення

### ❌ "GEMINI_API_KEY not found"

**Проблема**: API ключ не встановлений в Cloud Run

**Рішення**:
```bash
gcloud run services update retrograde-backend \
  --platform managed \
  --region us-central1 \
  --set-env-vars "GEMINI_API_KEY=your-actual-key"
```

### ❌ "ModuleNotFoundError: No module named 'astrology'"

**Проблема**: Неправильні імпорти або структура файлів

**Рішення**: Вже виправлено в останньому коміті. Перезапустіть деплой:
```bash
gcloud builds submit --config cloudbuild.yaml
```

### ❌ "Connection timeout" або "503 Service Unavailable"

**Проблема**: Сервіс не запустився або crashed

**Рішення**:
1. Перевірте логи: `./check_cloud_run_logs.sh`
2. Перевірте статус: 
```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1
```

### ❌ CORS помилки з frontend

**Проблема**: Frontend не може підключитися через CORS

**Рішення**: Вже виправлено - CORS дозволяє всі origins. Якщо проблема залишається:
```bash
# Перевірте CORS налаштування в логах
gcloud run services logs read retrograde-backend | grep CORS
```

## Перевірка змінних середовища

```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format='value(spec.template.spec.containers[0].env)'
```

Має показати:
- `GEMINI_API_KEY=***`
- `FRONTEND_URL=https://retrograde-project.vercel.app`

## Моніторинг

### Cloud Console

Відкрийте: https://console.cloud.google.com/run/detail/us-central1/retrograde-backend/metrics

Тут ви побачите:
- Request count
- Request latency
- Container CPU utilization
- Container memory utilization
- Error rate

### Alerts

Налаштуйте алерти для:
- Error rate > 5%
- Response time > 5s
- Container crashes

## Тестування AI

### Локально

```bash
cd backend
python3 test_ai_simple.py
```

### На Cloud Run

Після отримання URL:
```bash
curl -X POST https://your-url.run.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{"city": "Kyiv", "date": "1991-08-24"}' | python3 -m json.tool
```

Очікуваний результат:
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
    "case_id": "RD-XXX-VIRGO"
  }
}
```

## Debugging Checklist

- [ ] Сервіс запущений і доступний
- [ ] Health endpoint відповідає
- [ ] GEMINI_API_KEY встановлений
- [ ] Логи не показують помилок
- [ ] Predict endpoint повертає дані
- [ ] AI генерує вердикти (не fallback)
- [ ] CORS працює з frontend
- [ ] Response time < 5s

## Корисні команди

```bash
# Перезапустити сервіс
gcloud run services update retrograde-backend \
  --platform managed \
  --region us-central1

# Видалити сервіс
gcloud run services delete retrograde-backend \
  --platform managed \
  --region us-central1

# Список всіх сервісів
gcloud run services list

# Отримати повну інформацію
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1
```