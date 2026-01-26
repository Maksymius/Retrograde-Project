import os
import logging
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Telegram ліби
from aiogram import Bot, Dispatcher, types
from aiogram.types import Update, WebAppInfo
from aiogram.filters import CommandStart
from aiogram.utils.keyboard import InlineKeyboardBuilder

# Твої сервіси
from app.astrology import calculate_simple
from app.ai_engine import generate_verdict, generate_location_error_verdict

load_dotenv()

# --- CONFIG ---
TOKEN = os.getenv("TELEGRAM_TOKEN")
WEBHOOK_URL = os.getenv("WEBHOOK_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://retrograde-project.vercel.app")

# Налаштування логів
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- BOT LOGIC ---
bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    builder = InlineKeyboardBuilder()
    builder.button(
        text="🚪 УВІЙТИ В ТЕРМІНАЛ", 
        web_app=WebAppInfo(url=FRONTEND_URL)
    )
    await message.answer(
        f"Вітаю, об'єкт {message.from_user.first_name}.\n\n"
        "Ви підключились до Департаменту Ретроградності.\n"
        "Ініціюйте протокол аналізу за кнопкою нижче.",
        reply_markup=builder.as_markup()
    )

# --- LIFECYCLE (Керування вебхуком) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # При старті сервера встановлюємо вебхук
    if WEBHOOK_URL:
        logger.info(f"Setting Webhook to: {WEBHOOK_URL}")
        await bot.set_webhook(url=WEBHOOK_URL, drop_pending_updates=True)
    else:
        logger.warning("WEBHOOK_URL not set! Telegram bot will not work.")
    
    yield
    
    # При зупинці — видаляємо
    await bot.delete_webhook()

app = FastAPI(title="Retrograde Department API", version="1.1.0", lifespan=lifespan)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Для MVP дозволяємо все
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PredictionRequest(BaseModel):
    city: str
    date: str

class PredictionResponse(BaseModel):
    status: str
    data: dict

# --- ENDPOINTS ---

@app.get("/")
async def root():
    return {"message": "Retrograde Department API is operational", "bot_active": bool(TOKEN)}

@app.post("/webhook")
async def telegram_webhook(request: Request):
    """Сюди Telegram шле повідомлення"""
    update = Update.model_validate(await request.json(), context={"bot": bot})
    await dp.feed_update(bot, update)
    return {"ok": True}

@app.post("/api/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Сюди сайт шле запити"""
    try:
        # 1. Розрахунок астрології
        try:
            astral_data = calculate_simple(request.city, request.date)
        except Exception as e:
            logger.error(f"Astro fail: {e}")
            ai_response = generate_location_error_verdict(request.city)
            return PredictionResponse(status="success", data={"astral_data": {}, **ai_response})

        # 2. Генерація AI вердикту
        ai_response = generate_verdict(astral_data)
        
        return PredictionResponse(
            status="success",
            data={"astral_data": astral_data, **ai_response}
        )
    except Exception as e:
        logger.error(f"General error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")