import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

import reactome_utils
from database import DatabaseManager

class WAMPComponent(ApplicationSession):
    def __init(self, config=None):
        ApplicationSession.__init__(self, config)


    def onDisconnect(self):
        print("transport disconnected")

    @inlineCallbacks
    def onJoin(self, details):
        print("...[wamp] session joined")
        self.dbm = DatabaseManager()
        # self.dbm = DatabaseManager()
        # AUTHENTICATION
        def google_auth(id_token, name, email):
            try:
                print("...[wamp] google_auth")
                # auth_utils.register_login_user(id_token=id_token, name=name, email=email)
                # idinfo = self.dbm.validate_g_token(id_token=id_token)
                self.dbm.register_login_user(id_token=id_token, name=name, email=email)
                return True
            except Exception as e:
                print("...[wamp] failed to google_auth: {0}".format(e))
                pass
            else:
                return False

        # REACTOME
        def get_reactome_pathways_list():
            return reactome_utils.get_pathways_list()

        def get_reactome_pathway(pathway_id):
            return reactome_utils.get_pathway(pathway_id)

        try:
            yield self.register(google_auth, u"google.auth")
            yield self.register(get_reactome_pathways_list, u"reactome.pathways")
            yield self.register(get_reactome_pathway, u"reactome.pathway")
            print("...[wamp] Registered")
        except Exception as e:
            print("...[wamp] could not register: {0}".format(e))


if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    # runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    # runner = ApplicationRunner(url=u"wss://127.0.0.1:4433", realm=u"realm1", ssl=options)
    runner = ApplicationRunner(url=u"ws://127.0.0.1:4433", realm=u"realm1")
    runner.run(WAMPComponent)
