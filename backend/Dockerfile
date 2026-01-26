FROM python:3.11-slim

# 1. Робоча директорія всередині контейнера
WORKDIR /app

# 2. Системні бібліотеки (gcc потрібен для kerykeion)
RUN apt-get update && apt-get install -y gcc g++ && rm -rf /var/lib/apt/lists/*

# 3. Копіюємо requirements.txt
# (Ми вже в папці backend, тому просто беремо файл)
COPY requirements.txt .

# 4. Встановлюємо Python-залежності
RUN pip install --no-cache-dir -r requirements.txt

# 5. Копіюємо код
# (Беремо папку app, яка лежить поруч з Dockerfile, і кладемо її в контейнер)
COPY app/ ./app/

# 6. Додаткове налаштування шляхів (опціонально, але корисно)
ENV PYTHONPATH=/app

# 7. Запуск сервера
# uvicorn знайде app.main, бо папка app лежить прямо в робочій директорії
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]