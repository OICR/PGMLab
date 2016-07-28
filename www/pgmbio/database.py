from pymongo import MongoClient

import auth_utils

class DatabaseManager():
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client["pgmlab"]
        self.users = self.db["users"]
        self.uploads = self.db["uploads"]
    # Upsert user into db
    def register_login_user(self, id_token, name, email):
        sub = auth_utils.validate_g_token(id_token=id_token)["sub"]
        print("...[dbm] register user {}".format(sub))
        user = self.users.find_one({"_id": sub})
        if not user:
            self.users.insert_one({
                "_id": sub,
                "name": name,
                "email": email
            })
    # Get all users uploads
    def get_all_uploads(self, sub_uid):
        return
