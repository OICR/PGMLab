from database import Task, DatabaseSessionManager
import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

class Component(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        self.dbsm = DatabaseSessionManager()
        def register_login_user(id_token):
            sub = self.dbsm.validate_g_token(id_token=id_token)["sub"]
            user = self.dbsm.get_user(sub_uid=sub)
            if not user:
                self.dbsm.register_user(sub_uid=sub, name=name, email=email)
            print("...[wamp] {} signed in".format(sub))
        def get_user_tasks(id_token):
            sub = self.dbsm.validate_g_token(id_token=id_token)["sub"]
            tasks = self.dbsm.get_all_tasks(sub_uid=sub)
            tasks_dict = {}
            for task in tasks:
                tasks_dict[task.task_id] = task.to_dict()
            print("...[wamp] get_all_tasks")
            return tasks_dict
        # On Google authentication, register their basic info to PGMLab and return their tasks
        def google_auth(id_token, name, email):
            try:
                # Upsert user in db
                register_login_user(id_token=id_token)
                # Return all user's tasks
                return get_user_tasks(id_token=id_token)
            except:
                pass # Could not authenticate
            else:
                return False
        yield self.register(google_auth, u"google.auth")
        print("...[wamp] Procedures registered")

if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner.run(Component)
