from fastapi import APIRouter, Depends
from src.tasks import controller
from src.tasks.dtos import TaskSchema
from src.utils.db import get_db

router = APIRouter(prefix="/tasks")

# Post route


@router.post("/create")
def create_task_route(body: TaskSchema, db=Depends(get_db)):
    return controller.create_task(body, db)

# Get All Tasks route


@router.get("/all_tasks")
def get_all_tasks_route(db=Depends(get_db)):
    return controller.get_all_tasks(db)

# get one task route


@router.get("/one_task/{task_id}")
def get_one_task_route(task_id: int, db=Depends(get_db)):
    return controller.get_one_task(task_id, db)


# update_task_route
@router.put("/update_task/{task_id}")
def update_task_route(task_id: int, body: TaskSchema, db=Depends(get_db)):
    return controller.update_task(task_id, body, db)


# delete_task_route


@router.delete("/delete_task/{task_id}")
def delete_task_route(task_id: int, db=Depends(get_db)):
    return controller.delete_task(task_id, db)
