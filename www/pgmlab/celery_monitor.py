import threading
import time
import ast
import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

from autobahn.wamp.types import PublishOptions

class MonitorThread(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        from pgmlab_server import celery as celery_app
        self.celery_app = celery_app
        self.interval = 1
        self.state = self.celery_app.events.State()
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()
        yield

    def handle_task_received(self, event):
        print("task-received", event["uuid"])

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
                        # "task-received": self.handle_task_received,
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
