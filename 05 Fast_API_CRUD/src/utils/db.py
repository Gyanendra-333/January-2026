from fastapi import FastAPI
import asyncio
from sqlalchemy.exc import SQLAlchemyError
from src.utils.db import engine  # your db.py

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(lambda sync_conn: print("✅ Database connected successfully!"))
    except SQLAlchemyError as e:
        print("❌ Database connection failed:", e)
