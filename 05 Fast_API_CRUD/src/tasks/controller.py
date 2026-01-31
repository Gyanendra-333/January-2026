from src.tasks.dtos import TaskSchema
from sqlalchemy.orm import Session
from src.tasks.models import TaskModal


# Create Task function
def create_task(body: TaskSchema, db: Session):

    data = body.model_dump()
    new_task = TaskModal(title=data["title"],
                         description=data["description"],
                         is_completed=data["is_completed"])
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"status": "task created successfully", "data": new_task}


# Get All Tasks function
def get_all_tasks(db: Session):
    tasks = db.query(TaskModal).all()
    return {"status": "success", "data": tasks}


# get one task
def get_one_task(task_id: int, db: Session):
    task = db.query(TaskModal).filter(TaskModal.id == task_id).first()
    return {"status": "success", "data": task}


# update task function
def update_task(task_id: int, body: TaskSchema, db: Session):
    data = body.model_dump()
    task = db.query(TaskModal).filter(TaskModal.id == task_id).first()
    task.title = data["title"]
    task.description = data["description"]
    task.is_completed = data["is_completed"]
    db.commit()
    print(task)
    return {"status": "task updated successfully", "data": task}

# delete task function


def delete_task(task_id: int, db: Session):
    task = db.query(TaskModal).filter(TaskModal.id == task_id).first()
    db.delete(task)
    db.commit()
    return {"status": "task deleted successfully"}
