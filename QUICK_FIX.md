# 🚨 Швидке виправлення: Frontend не підключається до Backend

## Проблема
Frontend на Vercel намагається підключитися до `http://localhost:3000` замість Cloud Run.

## Причина
Змінна `NEXT_PUBLIC_API_URL` не встановлена в Vercel.

## ✅ Рішення (5 хвилин)

### Крок 1: Знайдіть ваш Cloud Run URL

**Варіант A: Через Google Cloud Console**
1. Відкрийте: https://console.cloud.google.com/run
2. Знайдіть сервіс `retrograde-back` або `retrograde-backend`
3. Скопіюйте URL (схожий на `https://retrograde-back-xxx.run.app`)

**Варіант B: Через Cloud Build**
1. Відкрийте: https://console.cloud.google.com/cloud-build/builds
2. Знайдіть останній успішний build
3. В логах знайдіть URL сервісу

**Варіант C: Якщо є доступ до gcloud**
```bash
gcloud run services list --platform managed
```

### Крок 2: Додайте URL в Vercel

1. **Відкрийте Vercel**:
   https://vercel.com/settings/environment-variables

2. **Або прямо до проекту**:
   https://vercel.com/maksymius/retrograde-project/settings/environment-variables

3. **Додайте змінну**:
   - Click "Add New"
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://retrograde-back-xxx.run.app` (ваш URL)
   - Environments: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

### Крок 3: Redeploy

**Варіант A: Через Vercel UI**
1. Перейдіть: https://vercel.com/maksymius/retrograde-project/deployments
2. Знайдіть останній деплой
3. Click "..." → "Redeploy"
4. Confirm

**Варіант B: Через Git**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

**Варіант C: Через Vercel CLI**
```bash
cd frontend
vercel --prod
```

### Крок 4: Перевірка

1. Почекайте 1-2 хвилини поки Vercel задеплоїть
2. Відкрийте: https://retrograde-project.vercel.app
3. Відкрийте Developer Console (F12)
4. Введіть запит: "Kyiv, 24.08.1991"
5. Перевірте логи - має бути:
   ```
   🌐 API URL: https://retrograde-back-xxx.run.app
   ```
   А НЕ:
   ```
   🌐 API URL: http://localhost:3000
   ```

## 🎯 Очікуваний результат

Після виправлення ви побачите:
- ✅ Астрологічні дані (Sun, Moon, Asc)
- ✅ AI вердикт від Gemini
- ✅ Правильний entropy level
- ✅ Case ID

Замість:
- ❌ "Системи Департаменту тимчасово перевантажені"
- ❌ N/A в астрологічних даних
- ❌ CONNECTION_LOST

## 📞 Якщо не працює

1. **Перевірте Cloud Run**:
   ```bash
   curl https://your-cloud-run-url.run.app/api/health
   ```
   Має повернути: `{"status":"healthy","service":"retrograde-oracle"}`

2. **Перевірте змінну в Vercel**:
   - Відкрийте: https://vercel.com/maksymius/retrograde-project/settings/environment-variables
   - Переконайтеся, що `NEXT_PUBLIC_API_URL` встановлена

3. **Перевірте логи Vercel**:
   - Відкрийте останній деплой
   - Перевірте Build Logs
   - Шукайте `NEXT_PUBLIC_API_URL`

4. **Перевірте CORS**:
   - Відкрийте Developer Console
   - Шукайте CORS помилки
   - Backend вже налаштований на `allow_origins=["*"]`

## 🔍 Debug

Якщо все ще не працює, перевірте в консолі браузера:

```javascript
// Має показати ваш Cloud Run URL
console.log(process.env.NEXT_PUBLIC_API_URL)
```

Якщо показує `undefined` - змінна не встановлена або не перезапущений деплой.