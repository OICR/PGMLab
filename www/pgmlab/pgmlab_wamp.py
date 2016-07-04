from pgmlab_db import db_session, Task

import six

from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner

from twisted.internet.defer import inlineCallbacks
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

class Component(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        # print('joined:', details)
        def get_all_tasks():
            tasks = db_session.query(Task).all()
            tasks_dict = {}
            for task in tasks:
                tasks_dict[task.task_id] = task.to_dict()
            print("get_all_tasks")
            return tasks_dict

        def update_task(task):
            print("update_task", task)
            yield self.publish("celery.task.update", task)

        yield self.register(get_all_tasks, u"celery.tasks")
        yield self.register(update_task, u"update.task")
        print("procs registered")

    @classmethod
    def test(self, task):
        print("TEST", self)
        self.publish("celery.task.update", task)
        # yield self.call(u"update.task", task)


if __name__ == "__main__":
    from pgmlab_server import celery
    # print('main', celery)
    from celery_monitor import MonitorThread
    MonitorThread(celery_app=celery, wamp_app=Component)

    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner.run(Component)
