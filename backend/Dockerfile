# 1. Образ
FROM python:3.11-slim

# 2. Робоча директорія
WORKDIR /app

# 3. Системні ліби для kerykeion
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 4. Встановлення залежностей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Копіювання коду
# Важливо: ми копіюємо папку app, щоб структура була /app/app/main.py
COPY app/ ./app/

# 6. Порт (Cloud Run ігнорує EXPOSE, але для порядку лишимо 8080)
EXPOSE 8080

# 7. ЗАПУСК
# Прямий запуск uvicorn. Він підхопить порт від Гугла через $PORT.
# Ми вказуємо шлях app.main:app, тому що папка app лежить у робочій директорії.
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT