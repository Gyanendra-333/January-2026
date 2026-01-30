from fastapi import APIRouter
from src.tasks import controller

router = APIRouter(prefix="/tasks")


@router.post("/create")
def create_task_route():
    return controller.create_task()
