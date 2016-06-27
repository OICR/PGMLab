from sqlalchemy import create_engine
engine = create_engine("sqlite:///pgmlab.db", echo="debug", echo_pool=True)

from sqlalchemy.orm import sessionmaker, scoped_session
Session = sessionmaker(bind=engine)
db_session = scoped_session(Session)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
# Need this for querying
Base.query = db_session.query_property()

from sqlalchemy import Column, String
import datetime
class Task(Base):
    __tablename__ = "tasks"
    task_id = Column(String, primary_key=True)
    task_type = Column(String)
    submit_datetime = Column(String)
    status = Column(String)

    def to_dict(self):
        # print(self.task_id, self.task_type, self.submit_datetime, self.status)
        return {
            "task_id": self.task_id,
            "task_type": self.task_type,
            "submit_datetime": self.submit_datetime,
            "status": self.status
        }

Base.metadata.create_all(engine)
