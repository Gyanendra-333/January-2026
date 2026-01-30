from fastapi import FastAPI
from src.utils.db import Base, engine
from src.tasks.models import TaskModal

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI CRUD Application")


@app.get("/")
async def root():
    return {"message": "FastAPI server running 🚀"}
