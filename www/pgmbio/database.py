from pymongo import MongoClient

import auth_utils

class DatabaseManager():
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client["pgmlab"]
        self.users = self.db["users"]
    # Upsert user into db
    def register_login_user(self, id_token, name, email):
        print("...[dbm] register_login_user")
        sub = auth_utils.validate_g_token(id_token=id_token)["sub"]
        user = self.users.find_one({"_id": sub})
        if not user:
            print("...[db] register user {}".format(sub))
            self.users.insert_one({
                "_id": sub,
                "name": name,
                "email": email
            })
        else:
            print("...[db] login user {}".format(sub))
