# Retrograde Project

Hybrid Monorepo - єдиний центр правди для коду та документації.

## Структура проєкту

```
📂 Retrograde_Project
├── 📂 00_Management      # 🧠 PM (Roadmap, Sprints)
├── 📂 01_Design_System   # 🎨 Дизайн (Visual DNA)
├── 📂 02_Engineering     # ⚙️ Архітектура (Specs, Prompts)
├── 📂 backend           # 🐍 Python код (API + Telegram Bot)
├── 📂 frontend          # ⚛️ Next.js код
└── README.md            # Головний вхід
```

## Компоненти системи

### 🌐 Frontend (Next.js)
- Sci-fi інтерфейс з терміналом
- Інтеграція з backend API
- Астрологічні розрахунки та AI вердикти

### 🐍 Backend (FastAPI)
- RESTful API для астрологічних розрахунків
- AI engine з Google Gemini
- Telegram Bot з WebApp інтеграцією

### 🤖 Telegram Bot
- Красива кнопка для запуску WebApp
- Бюрократичний стиль спілкування
- Інтеграція з основним додатком

## Швидкий старт

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend API
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Telegram Bot
```bash
cd backend
python run_bot.py
```

### Docker (все разом)
```bash
cd backend
docker-compose up
```

## Налаштування

1. Скопіюйте `backend/.env.example` в `backend/.env`
2. Додайте ваші API ключі:
   - `GEMINI_API_KEY` - для AI engine
   - `TELEGRAM_BOT_TOKEN` - для Telegram бота
3. Налаштуйте `WEBAPP_URL` для production

Детальні інструкції: `backend/TELEGRAM_BOT_SETUP.md`

## Налаштування Obsidian

Щоб Obsidian працював швидко, додай в **Settings → Files & Links → Excluded files**:

```
frontend/node_modules
frontend/.next
backend/venv
backend/__pycache__
.git
.idea
.vscode
.DS_Store
```

## Початок роботи

1. Відкрий папку в VS Code для розробки
2. Відкрий папку в Obsidian для документації
3. Налаштуй excluded files в Obsidian
4. Почни з `00_Management/Roadmap.md`

## Git

```bash
git init
git add .
git commit -m "Initial project structure"
```