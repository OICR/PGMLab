from sqlalchemy import create_engine
engine = create_engine("sqlite:///pgmlab.db", echo=True)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from sqlalchemy import Column, String, Boolean, DateTime
import datetime
class Inference(Base):
    __tablename__ = "inference_tasks"
    task_id = Column(String, primary_key=True)
    completed = Column(Boolean)
    submitted = Column(DateTime)
Base.metadata.create_all(engine)

from sqlalchemy.orm import sessionmaker, scoped_session
Session = sessionmaker(bind=engine)
session = scoped_session(Session)
