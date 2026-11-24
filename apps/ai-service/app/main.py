from datetime import datetime, timezone

from fastapi import FastAPI

app = FastAPI(
    title="KreditSmart AI Service",
    description=(
        "AI-powered financial intelligence "
        "and document analysis service"
    ),
    version="0.1.0",
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to KreditSmart AI",
        "version": "0.1.0",
    }


@app.get("/health")
async def health():
    return {
        "service": "kreditsmart-ai",
        "status": "ok",
        "version": "0.1.0",
        "timestamp": datetime.now(
            timezone.utc
        ).isoformat(),
    }