import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

import reactome_utils
from database import DatabaseManager

class Component(ApplicationSession):
    # def onConnect(self):
    #     print("transport connected")
    #
    # def onChallenge(self, challenge):
    #     print("authentication challenge")
    #
    # def onLeave(self, details):
    #     print("session left")
    #
    # def onDisconnect(self):
    #     print("transport disconnected")

    @inlineCallbacks
    def onJoin(self, details):
        self.dbm = DatabaseManager()
        # AUTHENTICATION
        def google_auth(id_token, name, email):
            try:
                print("...[wamp] google_auth")
                # auth_utils.register_login_user(id_token=id_token, name=name, email=email)
                # idinfo = self.dbm.validate_g_token(id_token=id_token)
                self.dbm.register_login_user(id_token=id_token, name=name, email=email)
                return True
            except:
                print("...[wamp] failed to google_auth")
                pass
            else:
                return False
        yield self.register(google_auth, u"google.auth")

        # REACTOME
        def get_reactome_pathways_list():
            return reactome_utils.get_pathways_list()
        yield self.register(get_reactome_pathways_list, u"reactome.pathways")

        def get_reactome_pathway(pathway_id):
            return reactome_utils.get_pathway(pathway_id)
        yield self.register(get_reactome_pathway, u"reactome.pathway")
        print("...[wamp] Registered")

        # DATABASE
        def get_uploads():
            return

if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    # runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner = ApplicationRunner(url=u"ws://127.0.0.1:443/ws", realm=u"realm1")
    runner.run(Component)
