from fastapi import APIRouter, Depends
from src.tasks import controller
from src.tasks.dtos import TaskSchema
from src.utils.db import get_db

router = APIRouter(prefix="/tasks")


@router.post("/create")
def create_task_route(body: TaskSchema, db=Depends(get_db)):
    return controller.create_task(body, db)
