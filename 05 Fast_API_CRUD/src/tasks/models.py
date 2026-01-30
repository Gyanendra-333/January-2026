from sqlalchemy import Boolean, Column, Integer, String, Text
from src.utils.db import Base


class TaskModal(Base):
    __tablename__ = "user_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    is_completed = Column(Boolean, default=False)
