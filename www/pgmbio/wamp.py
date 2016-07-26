import six
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.internet._sslverify import OpenSSLCertificateAuthorities
from twisted.internet.ssl import CertificateOptions
from OpenSSL import crypto

import reactome_utils

class Component(ApplicationSession):
    @inlineCallbacks
    def onJoin(self, details):
        def register_login_user(id_token):
            print("...[wamp] register_login_user", id_token)
        def google_auth(id_token, name, email):
            try:
                print("...[wamp] google_auth")
                return True
            except:
                pass
            else:
                return False
        yield self.register(google_auth, u"google.auth")

        def get_reactome_pathways_list():
            return reactome_utils.get_pathways_list()
        yield self.register(get_reactome_pathways_list, u"reactome.pathways")

        def get_reactome_pathway(pathway_id):
            return reactome_utils.get_pathway(pathway_id)
        yield self.register(get_reactome_pathway, u"reactome.pathway")
        print("...[wamp] Registered")

if __name__ == "__main__":
    cert = crypto.load_certificate(crypto.FILETYPE_PEM,six.u(open('.crossbar/example.cert.pem', "r").read()))
    options = CertificateOptions(trustRoot=OpenSSLCertificateAuthorities([cert]))
    runner = ApplicationRunner(url=u"wss://127.0.0.1:443/ws", realm=u"realm1", ssl=options)
    runner.run(Component)
