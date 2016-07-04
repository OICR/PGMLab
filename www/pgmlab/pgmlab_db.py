from sqlalchemy import create_engine
engine = create_engine("sqlite:///pgmlab.db", echo_pool=True)

from sqlalchemy.orm import sessionmaker, scoped_session
Session = sessionmaker(bind=engine)
db_session = scoped_session(Session)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
# Need this for querying
Base.query = db_session.query_property()

from sqlalchemy import Column, String, Integer, Float, null
import datetime
class Task(Base):
    __tablename__ = "tasks"
    task_id = Column(String, primary_key=True)
    task_type = Column(String)
    submit_datetime = Column(String) #can add other datetimes for task info (i.e. runtime, waittime, etc)
    status = Column(String)
    # Job metadata (i.e. parameters for different runs) causes unnormalized table (should be decoupled at some point)
    pi_filename = Column(String)
    obs_filename = Column(String)
    number_states = Column(Integer)
    # Learning
    max_iterations = Column(Integer, default=null())
    change_limit = Column(Float, default=null())
    # Inference
    lfg_filename = Column(String, default=null())

    def to_dict(self):
        task = {
            "task_id": self.task_id,
            "task_type": self.task_type,
            "submit_datetime": self.submit_datetime,
            "status": self.status,
            "pi_filename": self.pi_filename,
            "obs_filename": self.obs_filename,
            "number_states": self.number_states,
        }
        if self.task_type == "learning":
            task["max_iterations"] = self.max_iterations
            task["change_limit"] = self.change_limit
        else:
            task["lfg_filename"] = self.lfg_filename
        return task

Base.metadata.create_all(engine)
