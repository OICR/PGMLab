from pgmlab_db import db_session, Task
import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

class Component(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        def get_all_tasks():
            tasks = db_session.query(Task).all()
            tasks_dict = {}
            for task in tasks:
                tasks_dict[task.task_id] = task.to_dict()
            print("...get_all_tasks")
            return tasks_dict
        yield self.register(get_all_tasks, u"celery.tasks")
        print("...WAMP registered")

if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner.run(Component)
