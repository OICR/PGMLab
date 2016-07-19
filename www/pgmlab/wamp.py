from database import Task, DatabaseSessionManager
import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

from oauth2client import client, crypt
CLIENT_ID = "852145575631-a44j86epgif1illc4alnol126j4qsoku.apps.googleusercontent.com"

class Component(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        self.dbsm = DatabaseSessionManager()
        # On Google authentication, register their basic info to PGMLab
        def google_auth(id_token, name, email):
            try:
                idinfo = client.verify_id_token(id_token, CLIENT_ID)
                print(idinfo)
                if idinfo["aud"] not in [CLIENT_ID]:
                    raise crypt.AppIdentityError("Unrecognized client.")
                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    raise crypt.AppIdentityError("Wrong issuer.")
                # if idinfo['hd'] != #APPS_DOMAIN_NAME:
                #     raise crypt.AppIdentityError("Wrong hosted domain.")
            except crypt.AppIdentityError:
                pass # Invalid token
            # Upsert user in db
            user = self.dbsm.get_user(sub_uid=idinfo["sub"])
            if user:
                return "user exists"
            else:
                self.dbsm.register_user(sub_uid=idinfo["sub"], name=name, email=email)
                return "user DNE"
        def get_all_tasks():
            # tasks = db_session.query(Task).all()
            tasks = self.dbsm.get_all_tasks()
            tasks_dict = {}
            for task in tasks:
                tasks_dict[task.task_id] = task.to_dict()
            print("...[wamp] get_all_tasks")
            return tasks_dict
        yield self.register(google_auth, u"google.auth")
        yield self.register(get_all_tasks, u"celery.tasks")
        print("...[wamp] Procedures registered")

if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner.run(Component)
