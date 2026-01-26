
Це — дуже зрілий погляд. Ти не кидаєшся писати код, а спершу затверджуєш архітектуру. Це економить тобі тижні роботи в майбутньому.

Як твій **Tech Lead**, я провів аудит твого плану. В цілому — **тверді 8/10**. Але є кілька "мін уповільненої дії", які для *Solo Dev* треба розмінувати зараз, щоб не вигоріти на етапі налаштування.

Ось мій фаховий розбір і оптимізація.

---

### 1. Архітектурна Критика (Що ріжемо, що лишаємо)

**🟢 ЩО ДОБРЕ (Keep it):**
1.  **Monorepo:** Тримати все в одній папці — ідеально для соло. Менше перемикань контексту.
2.  **FastAPI + Aiogram в одному флаконі:** Це правильний патерн. Один сервер обробляє і вебхуки бота, і API запити фронтенда.
3.  **KISS Roadmap:** Розбивка на спринти логічна.

**🔴 ЩО ПРИБРАТИ/ЗМІНИТИ (Fix it):**
1.  **Зайва вкладеність (`core`, `services`, `bot`):**
    *   *Проблема:* У першому варіанті структури ти розмазав код по 5 папках. Для MVP це зайва біганина по файлах.
    *   *Рішення:* Спрощуємо. Використовуємо **"Modular Monolith"**. Тримаємо логіку ближче до кореня.
2.  **Бібліотека `kerykeion` і Docker:**
    *   *Ризик:* Ця бібліотека тягне за собою `pyswisseph`, яка написана на C. В Docker-контейнері (особливо Alpine Linux) вона може не зібратися без танців з бубном (компіляторів gcc).
    *   *Рішення:* Використовуємо в Docker образі `python:3.11-slim` (Debian), а не `alpine`. Там це працює стабільніше.
3.  **Deploy (VPS vs Cloud Run):**
    *   *Критика:* У спринті 3 ти пишеш "Купити VPS". Це помилка для соло-дева. VPS треба адмініструвати, оновлювати, налаштовувати Nginx, SSL...
    *   *Рішення:* Тільки **Serverless (Google Cloud Run)**. Загорнув у Docker -> кинув у Гугл -> забув. Воно саме масштабується і дає HTTPS.

---

### 2. Оптимізована Структура (Final Version)

Ми робимо структуру пласкою, але розширюваною.

```plaintext
📂 retrograde-bot
├── 📂 backend
│   ├── 📂 app              # Весь код тут
│   │   ├── __init__.py
│   │   ├── main.py         # Вхідна точка (FastAPI app)
│   │   ├── bot.py          # Хендлери Telegram (Aiogram router)
│   │   ├── engine.py       # Логіка: Астрологія + AI (найважливіше)
│   │   └── schemas.py      # Pydantic моделі (щоб фронт і бек розуміли одне одного)
│   ├── .env                # Твої ключі (не пушити в GitHub!)
│   ├── Dockerfile          # Інструкція для Cloud Run
│   └── requirements.txt    # Список ліб
│
├── 📂 frontend             # Next.js (стандартна структура)
│   ├── 📂 app
│   ├── 📂 components
│   ├── ...
│
├── .gitignore              # Ігноруємо venv, .env, node_modules
└── README.md               # Інструкція для самого себе через місяць
```

---

### 3. Технічні Нюанси (`requirements` & `Dockerfile`)

Це "м'ясо". Скопіюй собі, це зекономить тобі купу нервів при збірці.

#### **`backend/requirements.txt`**
Додаємо `pydantic-settings` для зручної роботи з `.env` та `uvicorn` для запуску.

```text
fastapi==0.109.0
uvicorn[standard]==0.27.0
aiogram>=3.3.0
google-genai>=0.3.0
kerykeion>=2.1.0
python-dotenv==1.0.0
pydantic>=2.5.0
pydantic-settings>=2.1.0
requests==2.31.0
```

#### **`backend/Dockerfile`** (Критично важливо!)
Використовуємо `slim` версію, щоб `kerykeion` (C-extension) встановився без помилок.

```dockerfile
# Використовуємо slim (Debian), бо kerykeion потребує компіляції C-коду
FROM python:3.11-slim

# Встановлюємо системні залежності (gcc), якщо kerykeion буде вередувати
RUN apt-get update && apt-get install -y build-essential --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Спочатку копіюємо requirements (кешування Docker шарів)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо код (папка app)
COPY app ./app

# Змінна порту для Cloud Run
ENV PORT=8080

# Запуск через модуль app.main
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

---

### 4. Фаховий "System Prompt" (Gemini 2.0)

Ось це — душа проєкту. Я переробив його під твою концепцію **"Транс-Будда-Кіберпанк-Бюрократ"**.

Збережи це в `backend/app/engine.py`.

```python
SYSTEM_INSTRUCTION = """
### IDENTITY
**Name:** Oracle-7 (Chief Compliance Officer of Karma Dept).
**Archetype:** Cyberpunk Bureaucrat / Cynical Bodhisattva.
**Tone:** Cold, precise, bureaucratic, strictly mocking human suffering as "statistical errors".
**Language:** Ukrainian (High-end, mixed with technical/bureaucratic jargon).

### WORLDVIEW
The Universe is a giant, poorly coded simulation. You are the debugger. Humans are bugged instances. Astrology is just the error log.
You DO NOT give advice. You issue **Verdicts** and **Patches**.

### INSTRUCTIONS
1.  **Analyze Input:** Look at the user's planetary positions (Sun, Moon, Ascendant, Houses).
2.  **Roast the Ego:** Use their "Sun" sign to mock their self-importance.
3.  **Expose the Glitch:** Use their "Moon" or "Mars" to identify their emotional bugs.
4.  **Style Guide:**
    *   Use terms like: "Protocol violation", "Karmic debt limit exceeded", "Null pointer exception in chakra 4".
    *   Reference "The Administrator" (God/Universe) as an absent CEO.
    *   Be funny but scary accurate.
    *   **Length:** Max 4 sentences. Make it punchy.

### FORMAT (Strict Output)
**SUBJECT ID:** [Generate random hex code, e.g. 0x5F1]
**ERROR LOG:** [The Astro Analysis]
**VERDICT:** [One crushing sentence]
**PATCH:** [Absurd advice, e.g. "Reboot your ego in Safe Mode."]

### EXAMPLES
User: "Sun in Leo"
You: "Detected critical overheating of the Narcissism Core. You think you are the protagonist? You are an NPC with bad dialogue."
"""
```

---

### 5. Що додати в Sprint 3 (The Money)

В "Sprint 3: The Money & Deploy" зміни пункт про VPS:

*   [ ] **Deploy:**
    *   Backend: `gcloud run deploy` (Безкоштовно, надійно).
    *   Frontend: `vercel --prod` (Безкоштовно).
*   [ ] **Database (Optional):**
    *   Якщо треба буде зберігати юзерів — підключи **Supabase** (Postgres as a Service). Це теж безкоштовно і не треба нічого налаштовувати. Але для MVP можна без неї (все рахуємо на льоту).

### Резюме
Структура стала чистішою. Ризики з білдом Docker прибрали. Промпт тепер працює на утримання аудиторії (персонаж яскравий).

**Твій наступний крок:** Створюй папку `retrograde-bot`, в ній `backend` і `frontend`, і копіюй туди `requirements.txt` і `Dockerfile`. Як буде готово — маякуй, поїдемо далі.