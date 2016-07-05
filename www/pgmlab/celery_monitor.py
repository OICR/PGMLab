import threading
import time
import ast

class MonitorThread(object):
    from pgmlab_db import db_session, Task

    def __init__(self, celery_app, wamp_app, interval=1):
        self.celery_app = celery_app
        self.interval = interval
        self.state = self.celery_app.events.State()
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()

        self.wamp_app = wamp_app

    def db_task_add(self, task_id, kwargs):
        print(kwargs)
        status = u"received"
        pi_filename = kwargs["pi_filename"]
        obs_filename = kwargs["obs_filename"]
        number_states = kwargs["number_states"]
        task = self.Task(
            task_id = task_id, #unicode
            task_type = kwargs["task_type"],
            submit_datetime = kwargs["submit_datetime"],
            status = status,
            pi_filename = pi_filename,
            obs_filename = obs_filename,
            number_states = number_states
        )
        if kwargs["task_type"] == "learning":
            task.change_limit = kwargs["change_limit"]
            task.max_iterations = kwargs["max_iterations"]
        else:
            task.lfg_filename = kwargs["lfg_filename"]
        self.db_session.add(task)
        return task

    def db_commit_publish(self, task):
        self.db_session.commit()
        self.wamp_app.session.publish("celery.task.update", task=task.to_dict())

    def handle_task_received(self, event):
        print("task-received", event["uuid"])
        kwargs = ast.literal_eval(event["kwargs"])
        task_id = event["uuid"]
        task = self.db_task_add(task_id=task_id, kwargs=kwargs)
        self.db_commit_publish(task=task)

    def handle_task_started(self, event):
        print("task-started", event["uuid"])
        task_id = event["uuid"]
        task = self.db_session.query(self.Task).get(task_id)
        task.status = u"started"
        self.db_commit_publish(task=task)

    def handle_task_succeeded(self, event):
        print("task-succeeded", event["uuid"])
        task_id = event["uuid"]
        task = self.db_session.query(self.Task).get(task_id)
        task.status = u"succeeded"
        self.db_commit_publish(task=task)

    def handle_task_failed(self, event):
        print("task-failed", event["uuid"])
        task_id = event["uuid"]
        task = self.db_session.query(self.Task).get(task_id)
        task.status = u"failed"
        self.db_commit_publish(task=task)

    def run(self):
        while True:
            try:
                with self.celery_app.connection() as connection:
                    recv = self.celery_app.events.Receiver(connection, handlers={
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
