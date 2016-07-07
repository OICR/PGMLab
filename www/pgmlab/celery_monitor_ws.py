import sys

from twisted.internet import reactor, ssl
from twisted.web.server import Site
from twisted.web.static import File

import txaio

import threading
import time

from autobahn.twisted.websocket import WebSocketServerFactory, \
    WebSocketServerProtocol, \
    listenWS


class EchoServerProtocol(WebSocketServerProtocol):
    def onOpen(self):
        print("WS connected", self)
        from pgmlab_server import celery as celery_app
        self.celery_app = celery_app
        self.interval = 1
        self.state = self.celery_app.events.State()
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()
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
                print("tru try")
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

    def onMessage(self, payload, isBinary):
        print('pl', payload)
        self.sendMessage(payload, isBinary)


if __name__ == '__main__':
    txaio.start_logging(level='debug')

    # SSL server context: load server key and certificate
    # We use this for both WS and Web!
    contextFactory = ssl.DefaultOpenSSLContextFactory('./server.key','./server.crt')
    factory = WebSocketServerFactory(u"wss://127.0.0.1:433/sock")

    factory.protocol = EchoServerProtocol
    listenWS(factory, contextFactory)

    webdir = File(".")
    webdir.contentTypes['.crt'] = 'application/x-x509-ca-cert'
    web = Site(webdir)
    # reactor.listenSSL(8080, web, contextFactory)
    reactor.listenSSL(9000, web, contextFactory)
    reactor.run()
