from fastapi import FastAPI
from src.utils.db import Base, engine
from src.tasks.models import TaskModal
from src.tasks.router import router as TaskRouter

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI CRUD Application")
app.include_router(TaskRouter)


@app.get("/")
async def root():
    return {"message": "FastAPI server running 🚀"}
