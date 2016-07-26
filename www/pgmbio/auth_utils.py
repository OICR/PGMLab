from oauth2client import client, crypt
CLIENT_ID = "852145575631-l5luk85au20hbh9p2vbf68u3jd7v0h1k.apps.googleusercontent.com"

def validate_g_token(id_token):
    try:
        idinfo = client.verify_id_token(id_token, CLIENT_ID)
        if idinfo["aud"] not in [CLIENT_ID]:
            raise crypt.AppIdentityError("Unrecognized client.")
        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise crypt.AppIdentityError("Wrong issuer.")
        # if idinfo['hd'] != #APPS_DOMAIN_NAME:
        #     raise crypt.AppIdentityError("Wrong hosted domain.")
        return idinfo
    except crypt.AppIdentityError:
        pass # Invalid token

def register_login_user(id_token, name, email):
    sub = validate_g_token(id_token=id_token)["sub"]
    print("...[auth] register_login_user {}".format(sub))
    # GET USER FROM DB
    # IF USER DNE, REGISTER (:sub, name, email)
