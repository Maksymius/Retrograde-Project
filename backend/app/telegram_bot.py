import asyncio
import os
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.filters import CommandStart
from aiogram.utils.keyboard import InlineKeyboardBuilder
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Bot configuration
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://retrograde-project.vercel.app")

if not BOT_TOKEN:
    raise ValueError("TELEGRAM_BOT_TOKEN not found in environment variables")

# Initialize bot and dispatcher
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    """Handle /start command with WebApp button"""
    
    # Create inline keyboard with WebApp button
    builder = InlineKeyboardBuilder()
    builder.button(
        text="🚪 Увійти в Департамент",
        web_app=WebAppInfo(url=WEBAPP_URL)
    )
    
    # Welcome message in bureaucratic style
    welcome_text = (
        f"Вітаю, об'єкт {message.from_user.first_name}.\n\n"
        "🏛️ Ви знаходитесь у приймальній Департаменту Ретроградності.\n\n"
        "📋 Для отримання оцінки вашої кармічної заборгованості "
        "та визначення рівня ентропії особистості, "
        "відкрийте захищений термінал за кнопкою нижче.\n\n"
        "⚠️ Увага: всі дані будуть передані до центрального архіву "
        "для подальшого аналізу космічною бюрократією."
    )
    
    await message.answer(
        welcome_text,
        reply_markup=builder.as_markup()
    )

@dp.message()
async def handle_other_messages(message: types.Message):
    """Handle all other messages"""
    
    # Create the same WebApp button
    builder = InlineKeyboardBuilder()
    builder.button(
        text="🚪 Увійти в Департамент",
        web_app=WebAppInfo(url=WEBAPP_URL)
    )
    
    responses = [
        "Департамент обробляє лише офіційні запити через термінал.",
        "Для взаємодії з системою використовуйте кнопку нижче.",
        "Неавторизований доступ заборонено. Використовуйте офіційний інтерфейс.",
        "Система розпізнає лише команди через веб-термінал.",
    ]
    
    import random
    response_text = random.choice(responses)
    
    await message.answer(
        response_text,
        reply_markup=builder.as_markup()
    )

async def main():
    """Main function to run the bot"""
    print("🤖 Telegram bot starting...")
    print(f"📱 WebApp URL: {WEBAPP_URL}")
    
    try:
        # Start polling
        await dp.start_polling(bot)
    except Exception as e:
        print(f"❌ Bot error: {e}")
    finally:
        await bot.session.close()

if __name__ == "__main__":
    asyncio.run(main())