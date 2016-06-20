from sqlalchemy import create_engine
engine = create_engine("sqlite:///pgmlab.db", echo=True)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from sqlalchemy import Column, String, Boolean, DateTime
import datetime
class Task(Base):
    __tablename__ = "tasks"
    task_id = Column(String, primary_key=True)
    task_type = Column(String)
    completed = Column(Boolean)
    submitted = Column(DateTime)

Base.metadata.create_all(engine)

from sqlalchemy.orm import sessionmaker, scoped_session
Session = sessionmaker(bind=engine)
session = scoped_session(Session)
