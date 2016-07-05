import threading
import time
import ast
import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

class MonitorThread(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        # print(self.factory._myAppSession)
        # if not self.factory._myAppSession:
        #     self.factory._myAppSession = self
        from pgmlab_server import celery
        self.celery_app = celery
        self.interval = 1
        self.state = self.celery_app.events.State()
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()
        yield self.publish("on.update", 'some_task')

    @inlineCallbacks
    def handle_task_received(self, event):
        print("task-received", event["uuid"])
        res = yield self.publish("on.update", "recv")
        resultValue(res)
        # self.update_task(task="recv")
        # kwargs = ast.literal_eval(event["kwargs"])
        # task_id = event["uuid"]
        # self.wamp.call("update.task", "recv")
        # self.wamp.session.call("celery.tasks")
        # task = self.db_task_add(task_id=task_id, kwargs=kwargs)
        # self.db_commit_publish(task=task)
        # wamp.publish_task_update()
    @inlineCallbacks
    def handle_task_started(self, event):
        print("task-started", event["uuid"])
        res = yield self.publish("on.update", "started")
        resultValue(res)
        # self.update_task(task="started")
        # task_id = event["uuid"]
        # task = self.db_session.query(self.Task).get(task_id)
        # task.status = u"started"
        # self.wamp.publish_task_update(task="start")
        # self.db_commit_publish(task=task)
    @inlineCallbacks
    def handle_task_succeeded(self, event):
        print("task-succeeded", event["uuid"])
        res = yield self.publish("on.update", "succeeded")
        resultValue(res)
        # self.update_task(task="success")
        # task_id = event["uuid"]
        # task = self.db_session.query(self.Task).get(task_id)
        # task.status = u"succeeded"
        # self.wamp.publish_task_update(task="succeed")
        # self.db_commit_publish(task=task)
    @inlineCallbacks
    def handle_task_failed(self, event):
        print("task-failed", event["uuid"])
        res = yield self.publish("on.update", "failed")
        resultValue(res)
        # self.update_task(task="fail")
        # task_id = event["uuid"]
        # task = self.db_session.query(self.Task).get(task_id)
        # task.status = u"failed"
        # self.db_commit_publish(task=task)
        # self.wamp.publish_task_update(task="failed")

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

if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner.run(MonitorThread)


    #
    # def db_task_add(self, task_id, kwargs):
    #     print(kwargs)
    #     status = u"received"
    #     pi_filename = kwargs["pi_filename"]
    #     obs_filename = kwargs["obs_filename"]
    #     number_states = kwargs["number_states"]
    #     task = self.Task(
    #         task_id = task_id, #unicode
    #         task_type = kwargs["task_type"],
    #         submit_datetime = kwargs["submit_datetime"],
    #         status = status,
    #         pi_filename = pi_filename,
    #         obs_filename = obs_filename,
    #         number_states = number_states
    #     )
    #     if kwargs["task_type"] == "learning":
    #         task.change_limit = kwargs["change_limit"]
    #         task.max_iterations = kwargs["max_iterations"]
    #     else:
    #         task.lfg_filename = kwargs["lfg_filename"]
    #     self.db_session.add(task)
    #     self.wamp.publish_task_update("asd")
    #     return task
