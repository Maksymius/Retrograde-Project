# 🚀 Швидкий старт деплою

## Google Cloud Run (Backend)

### Варіант 1: Через UI (найпростіший)

1. **Відкрийте Cloud Build Triggers**: https://console.cloud.google.com/cloud-build/triggers
2. **Натисніть "CREATE TRIGGER"**
3. **Налаштуйте**:
   - Name: `retrograde-backend-deploy`
   - Event: Push to branch `main`
   - Source: Ваш GitHub репозиторій
   - Configuration: `cloudbuild.yaml` (в корені проекту)
   
4. **Додайте змінні** (важливо!):
   - `_GEMINI_API_KEY`: ваш API ключ
   - `_FRONTEND_URL`: `https://retrograde-project.vercel.app`

5. **Збережіть** і зробіть push до `main` - деплой запуститься автоматично!

### Варіант 2: Через командний рядок

```bash
# 1. Встановіть змінні
export PROJECT_ID="your-project-id"
export GEMINI_API_KEY="your-api-key"

# 2. Запустіть деплой
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions _GEMINI_API_KEY="$GEMINI_API_KEY",_FRONTEND_URL="https://retrograde-project.vercel.app"
```

### Після деплою

1. **Отримайте URL**:
```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'
```

2. **Протестуйте**:
```bash
curl https://your-url.run.app/api/health
```

## Vercel (Frontend)

Frontend вже задеплоєний на Vercel. Для оновлення:

1. **Додайте змінну середовища** в Vercel:
   - `NEXT_PUBLIC_API_URL`: URL вашого Cloud Run сервісу

2. **Оновіть код** (якщо потрібно):
```typescript
// frontend/app/page.tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

3. **Задеплойте**:
```bash
cd frontend
vercel --prod
```

## Telegram Bot

### Локальний запуск

```bash
cd backend
python run_bot.py
```

### Cloud Run (окремий сервіс)

Створіть окремий Cloud Run сервіс для бота:

```bash
gcloud run deploy retrograde-telegram-bot \
  --image gcr.io/$PROJECT_ID/retrograde-backend:latest \
  --platform managed \
  --region us-central1 \
  --set-env-vars "TELEGRAM_BOT_TOKEN=$BOT_TOKEN,WEBAPP_URL=https://retrograde-project.vercel.app" \
  --command "python" \
  --args "run_bot.py"
```

## Швидка перевірка

### Backend
```bash
# Health check
curl https://your-backend-url.run.app/api/health

# Test prediction
curl -X POST https://your-backend-url.run.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{"city": "Kyiv", "date": "1991-08-24"}'
```

### Frontend
Відкрийте: https://retrograde-project.vercel.app

### Telegram Bot
1. Знайдіть бота в Telegram
2. Надішліть `/start`
3. Натисніть кнопку "🚪 Увійти в Департамент"

## Troubleshooting

### "is a directory" помилка

✅ **Виправлено!** Використовуйте `cloudbuild.yaml` з кореня проекту.

Якщо все ще бачите помилку:
- Перевірте, що `cloudbuild.yaml` в корені проекту
- Переконайтеся, що в тригері вказано правильний шлях до конфігурації

### CORS помилки

Додайте ваш frontend URL до `backend/app/main.py`:
```python
allow_origins=[
    "https://your-frontend-url.vercel.app"
]
```

### AI не працює

Перевірте, що `GEMINI_API_KEY` правильно встановлений:
```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format 'value(spec.template.spec.containers[0].env)'
```

## Корисні команди

```bash
# Логи Cloud Run
gcloud run services logs read retrograde-backend --limit 50

# Список сервісів
gcloud run services list

# Оновити змінні середовища
gcloud run services update retrograde-backend \
  --set-env-vars "NEW_VAR=value"

# Видалити сервіс
gcloud run services delete retrograde-backend
```

## Вартість

- **Cloud Run**: Free tier (2M запитів/місяць)
- **Vercel**: Free tier (100GB bandwidth)
- **Telegram Bot**: Безкоштовно

Для більшості проектів це повністю безкоштовно! 🎉