# 🚀 Налаштування Vercel для Retrograde Project

## Крок 1: Отримайте Cloud Run URL

```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format='value(status.url)'
```

Приклад: `https://retrograde-back-xxx.run.app`

## Крок 2: Додайте змінну середовища в Vercel

### Через UI (рекомендовано)

1. Відкрийте: https://vercel.com/your-username/retrograde-project/settings/environment-variables
2. Додайте нову змінну:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://retrograde-back-xxx.run.app` (ваш Cloud Run URL)
   - **Environment**: Production, Preview, Development (виберіть всі)
3. Натисніть **Save**

### Через CLI

```bash
# Встановіть Vercel CLI (якщо ще не встановлено)
npm i -g vercel

# Додайте змінну
vercel env add NEXT_PUBLIC_API_URL production
# Введіть ваш Cloud Run URL

# Також додайте для preview та development
vercel env add NEXT_PUBLIC_API_URL preview
vercel env add NEXT_PUBLIC_API_URL development
```

## Крок 3: Перезапустіть деплой

### Через UI
1. Відкрийте: https://vercel.com/your-username/retrograde-project
2. Перейдіть на вкладку **Deployments**
3. Знайдіть останній деплой
4. Натисніть **...** → **Redeploy**

### Через CLI
```bash
cd frontend
vercel --prod
```

### Через Git
```bash
# Просто запуште будь-які зміни
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

## Крок 4: Перевірка

1. Відкрийте ваш сайт: https://retrograde-project.vercel.app
2. Відкрийте Developer Console (F12)
3. Введіть запит (наприклад: "Kyiv, 24.08.1991")
4. Перевірте логи в консолі:
   - Має бути: `🌐 API URL: https://retrograde-back-xxx.run.app`
   - НЕ має бути: `http://localhost:8000`

## Локальна розробка

Для локальної розробки створіть `.env.local`:

```bash
cd frontend
cp .env.local.example .env.local
```

Відредагуйте `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Тепер локально буде використовуватися localhost, а на Vercel - Cloud Run URL.

## Troubleshooting

### ❌ "Системи Департаменту тимчасово перевантажені"

Це fallback повідомлення, означає що frontend не може підключитися до backend.

**Перевірте:**
1. Чи правильно встановлена змінна `NEXT_PUBLIC_API_URL` в Vercel
2. Чи доступний Cloud Run URL (відкрийте в браузері)
3. Чи є CORS помилки в консолі браузера

### ❌ CORS помилки

Backend вже налаштований на `allow_origins=["*"]`, але якщо проблема залишається:

```bash
# Перевірте CORS в логах Cloud Run
gcloud run services logs read retrograde-backend | grep CORS
```

### ❌ "Failed to fetch"

**Причини:**
1. Cloud Run URL неправильний
2. Сервіс не запущений
3. Мережеві проблеми

**Рішення:**
```bash
# Перевірте статус сервісу
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1

# Протестуйте URL
curl https://your-cloud-run-url.run.app/api/health
```

## Корисні команди

```bash
# Перевірити змінні в Vercel
vercel env ls

# Видалити змінну
vercel env rm NEXT_PUBLIC_API_URL production

# Локальний запуск з production змінними
vercel dev
```

## Перевірка після налаштування

✅ Checklist:
- [ ] Cloud Run URL отриманий
- [ ] Змінна `NEXT_PUBLIC_API_URL` додана в Vercel
- [ ] Vercel redeploy виконаний
- [ ] Сайт відкривається
- [ ] В консолі браузера видно правильний API URL
- [ ] Запит повертає реальні дані (не fallback)
- [ ] Астрологічні дані відображаються
- [ ] AI вердикт генерується

## Приклад правильної відповіді

В консолі браузера має бути:
```
🚀 Making API request to backend...
🌐 API URL: https://retrograde-back-xxx.run.app
📍 Location: Kyiv
📅 Date: 1991-08-24
📡 Response status: 200
✅ API Response received: {status: "success", data: {...}}
```

А НЕ:
```
❌ API Error Details: TypeError: Failed to fetch
```