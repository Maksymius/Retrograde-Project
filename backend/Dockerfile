FROM python:3.11-slim

# Робоча директорія
WORKDIR /app

# Системні ліби
RUN apt-get update && apt-get install -y gcc g++ && rm -rf /var/lib/apt/lists/*

# Копіюємо requirements ПРАВИЛЬНО (з урахуванням структури папок)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо вміст папки backend/app у папку app всередині контейнера
COPY backend/app/ ./app/

# Встановлюємо PYTHONPATH, щоб Python бачив папку app як модуль
ENV PYTHONPATH=/app

# ВАЖЛИВО: Запуск. Ми в папці /app, тому шлях app.main:app правильний
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]