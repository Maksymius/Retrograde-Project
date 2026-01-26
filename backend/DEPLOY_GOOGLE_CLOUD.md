# Деплой Backend на Google Cloud Run

## Крок 1: Підготовка проекту

1. Переконайтеся, що у вас є Google Cloud проект
2. Увімкніть необхідні API:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

## Крок 2: Налаштування Cloud Build Trigger

### Варіант A: Через UI (рекомендовано)

1. Відкрийте [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Натисніть "CREATE TRIGGER"
3. Налаштуйте тригер:
   - **Name**: `retrograde-backend-deploy`
   - **Event**: Push to a branch
   - **Source**: Ваш GitHub репозиторій
   - **Branch**: `^main$`
   - **Configuration**: Cloud Build configuration file (yaml or json)
   - **Cloud Build configuration file location**: `cloudbuild.yaml` (або `backend/cloudbuild.yaml`)

4. **Важливо! Налаштування Substitution Variables:**
   - Натисніть "ADD VARIABLE"
   - Додайте змінні:
     - `_GEMINI_API_KEY`: ваш Gemini API ключ
     - `_FRONTEND_URL`: `https://retrograde-project.vercel.app`

5. Збережіть тригер

### Варіант B: Через gcloud CLI

```bash
# Створіть тригер з командного рядка
gcloud builds triggers create github \
  --name="retrograde-backend-deploy" \
  --repo-name="Retrograde-Project" \
  --repo-owner="Maksymius" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml" \
  --substitutions="_GEMINI_API_KEY=YOUR_API_KEY,_FRONTEND_URL=https://retrograde-project.vercel.app"
```

## Крок 3: Ручний деплой (для тестування)

### Локальна збірка та деплой:

```bash
# 1. Встановіть змінні
export PROJECT_ID="your-project-id"
export GEMINI_API_KEY="your-gemini-api-key"
export FRONTEND_URL="https://retrograde-project.vercel.app"

# 2. Збудуйте Docker image
cd backend
docker build -t gcr.io/$PROJECT_ID/retrograde-backend:latest .

# 3. Запуште image до Container Registry
docker push gcr.io/$PROJECT_ID/retrograde-backend:latest

# 4. Задеплойте на Cloud Run
gcloud run deploy retrograde-backend \
  --image gcr.io/$PROJECT_ID/retrograde-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=$GEMINI_API_KEY,FRONTEND_URL=$FRONTEND_URL" \
  --port 8000
```

### Або використайте gcloud builds:

```bash
# З кореня проекту
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions _GEMINI_API_KEY="$GEMINI_API_KEY",_FRONTEND_URL="$FRONTEND_URL"

# Або з директорії backend
cd backend
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions _GEMINI_API_KEY="$GEMINI_API_KEY",_FRONTEND_URL="$FRONTEND_URL"
```

## Крок 4: Налаштування CORS для Frontend

Після деплою отримайте URL вашого Cloud Run сервісу:

```bash
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'
```

Оновіть `backend/app/main.py` з новим URL:

```python
allow_origins=[
    "http://localhost:3000",
    "https://retrograde-project.vercel.app",
    "https://your-cloud-run-url.run.app"
]
```

## Крок 5: Оновлення Frontend

Оновіть URL API у вашому frontend:

```typescript
// frontend/app/page.tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-cloud-run-url.run.app'

const response = await fetch(`${API_URL}/api/predict`, {
  // ...
})
```

Додайте змінну в Vercel:
```bash
vercel env add NEXT_PUBLIC_API_URL
# Введіть: https://your-cloud-run-url.run.app
```

## Troubleshooting

### Помилка: "is a directory"

Якщо бачите помилку `read /var/lib/docker/tmp/docker-builder.../backend: is a directory`:

**Рішення 1**: Використовуйте `cloudbuild.yaml` з кореня проекту з правильним шляхом:
```yaml
- name: 'gcr.io/cloud-builders/docker'
  args:
    - 'build'
    - '-f'
    - 'backend/Dockerfile'  # Шлях до Dockerfile
    - 'backend'              # Build context (директорія)
```

**Рішення 2**: Використовуйте `backend/cloudbuild.yaml` і встановіть "Source location" в тригері на `backend/`

### Помилка: "Permission denied"

```bash
# Надайте права Cloud Build service account
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"
```

### Перевірка логів

```bash
# Логи Cloud Build
gcloud builds list --limit=5
gcloud builds log BUILD_ID

# Логи Cloud Run
gcloud run services logs read retrograde-backend \
  --region us-central1 \
  --limit 50
```

## Моніторинг

Перевірте статус сервісу:
```bash
# Отримати інформацію про сервіс
gcloud run services describe retrograde-backend \
  --platform managed \
  --region us-central1

# Тестування API
curl https://your-cloud-run-url.run.app/api/health
```

## Автоматичний деплой

Після налаштування тригера, кожен push до `main` гілки автоматично:
1. Збудує новий Docker image
2. Запуште його до Container Registry
3. Задеплоїть на Cloud Run
4. Оновить сервіс з новим кодом

## Вартість

Cloud Run має generous free tier:
- 2 мільйони запитів на місяць
- 360,000 GB-секунд пам'яті
- 180,000 vCPU-секунд

Для більшості проектів це безкоштовно!