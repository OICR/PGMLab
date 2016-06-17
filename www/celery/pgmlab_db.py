from sqlalchemy import orm, schema, types
import datetime

metadata = schema.MetaData()

def now():
    return datetime.datetime.now()

# Database schema
inference_jobs_table = schema.Table("inference_jobs", metadata,
    schema.Column("id", types.Integer, primary_key=True),
    schema.Column("job_id", types.Text(), nullable=False, unique=True),
    schema.Column("status", types.Text(), nullable=False),
    schema.Column("submitted", types.DateTime(), default=now),
)

# Define classes and mappers to work with Object-Relational API
class Inference(object):
    pass
orm.mapper(Inference, inference_jobs_table)

# Session
from sqlite3 import dbapi2 as sqlite
from sqlalchemy.engine import create_engine
engine = create_engine("sqlite:///pgmlab.db", echo=True, module=sqlite)
session_maker = orm.sessionmaker(bind=engine)
session = orm.scoped_session(session_maker)
