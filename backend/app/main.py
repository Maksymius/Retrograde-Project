from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Retrograde Department API", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PredictionRequest(BaseModel):
    city: str
    date: str  # Format: "1991-08-24"

class PredictionResponse(BaseModel):
    status: str
    data: dict

@app.get("/")
async def root():
    return {"message": "Retrograde Department API is operational"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "retrograde-oracle"}

# Import our services
from astrology import calculate_simple
from ai_engine import generate_verdict, generate_location_error_verdict

# Main prediction endpoint
@app.post("/api/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        print(f"Processing request for {request.city}, {request.date}")
        
        # Step 1: Calculate astrology
        try:
            astral_data = calculate_simple(request.city, request.date)
            print(f"Astral data calculated: {astral_data}")
        except Exception as astro_error:
            print(f"Astrology failed: {astro_error}")
            # If astrology fails, generate location error verdict
            ai_response = generate_location_error_verdict(request.city)
            return PredictionResponse(
                status="success",  # Still success, just different type of response
                data={
                    "astral_data": {},
                    **ai_response
                }
            )
        
        # Step 2: Generate AI verdict
        try:
            ai_response = generate_verdict(astral_data)
            print(f"AI response generated: {ai_response}")
        except Exception as ai_error:
            print(f"AI generation failed: {ai_error}")
            # Fallback response
            ai_response = {
                "verdict": "Системи Департаменту тимчасово перевантажені космічною бюрократією. Спробуйте пізніше.",
                "entropy": "SYSTEM_ERROR",
                "case_id": "RD-500-ERROR"
            }
        
        # Step 3: Return combined response
        return PredictionResponse(
            status="success",
            data={
                "astral_data": astral_data,
                **ai_response
            }
        )
        
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error in Retrograde Department systems"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)