import threading
import time
import ast

class MonitorThread(object):
    from pgmlab_db import Task
    db_session = None
    wamp_app = None
    Task = None
    def __init__(self, celery_app, wamp_app, db_session, Task, interval=1):
        self.celery_app = celery_app
        self.interval = interval
        self.state = self.celery_app.events.State()
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()
        # This works but needs to be moved outside of __init__
        db_session = db_session
        wamp_app = wamp_app
        task = Task(
            task_id = 'task',
            task_type = "k_type",
            # submit_datetime = submit_datetime,
            status = "status"
        )
        print db_session
        db_session.add(task)
        db_session.commit()
        print db_session
        #
    def handle_task_sent(self, event):
        print("task-sent", event["uuid"])

    def handle_task_received(self, event):
        print("task-received", event["uuid"])
        kwargs = ast.literal_eval(event["kwargs"])
        task_id = event["uuid"]
        task_type = kwargs["task_type"]
        submit_datetime = kwargs["submit_datetime"]
        status = "received"
        # print Task
        # print db_session
        # print("SAD")
        # task = Task(
        #     task_id = task_id,
        #     task_type = task_type,
        #     submit_datetime = submit_datetime,
        #     status = status
        # )
        # print db_session
        # db_session.add(task)
        # db_session.commit()


    def handle_task_started(self, event):
        print("task-started", event["uuid"])

    def handle_task_succeeded(self, event):
        print("task-succeeded", event["uuid"])

    def handle_task_failed(self, event):
        print("task-failed", event["uuid"])


    def run(self):
        while True:
            try:
                with self.celery_app.connection() as connection:
                    recv = self.celery_app.events.Receiver(connection, handlers={
                        "task-sent": self.handle_task_sent,
                        "task-received": self.handle_task_received,
                        "task-started": self.handle_task_started,
                        "task-succeeded": self.handle_task_succeeded,
                        "task-failed": self.handle_task_failed
                    })
                    recv.capture(limit=None, timeout=None, wakeup=True)
            except (KeyboardInterrupt, SystemExit):
                raise
            except Exception: # unable to capture
                pass
            time.sleep(self.interval)
