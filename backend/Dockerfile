# 1. Використовуємо slim образ
FROM python:3.11-slim

# 2. Робоча папка всередині контейнера
WORKDIR /app

# 3. Встановлюємо залежності для астрологічної ліби (gcc, g++)
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 4. КОПІЮЄМО З УРАХУВАННЯМ ПАПКИ backend (Monorepo setup)
# Оскільки контекст — корінь репозиторію
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Копіюємо код бекенду в папку app
COPY backend/app/ ./app/
COPY backend/run_bot.py .

# 6. ВИДАЛЯЄМО ХАРДКОД ПОРТУ 8000
# Не встановлюй ENV PORT, Гугл сам його надасть.
# EXPOSE теж не обов'язковий, але якщо хочеш — став 8080.
EXPOSE 8080

# 7. ЗАПУСК (Використовуємо динамічний порт)
# Важливо: використовуємо подвійні лапки і $PORT без фігурних дужок 
# або через shell-формат, щоб uvicorn його підхопив
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT