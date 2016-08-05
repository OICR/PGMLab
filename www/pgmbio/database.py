from pymongo import MongoClient, ASCENDING
from bson import json_util

import auth_utils

class DatabaseManager():
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client["pgmlab"]
        self.users = self.db["users"]
        self.uploads = self.db["uploads"]
        self.pairwise_interactions = self.db["pairwise_interactions"]
        self.observations = self.db["observations"]
        self.parameters = self.db["parameters"]
        self.probabilities = self.db["probabilities"]
    # AUTHENTICATION
    # Upsert user into db
    def register_login_user(self, id_token, name, email):
        sub = auth_utils.validate_g_token(id_token=id_token)["sub"]
        print("...[dbm] register_login user {}".format(sub))
        user = self.users.find_one({"_id": sub})
        if not user:
            print("...[dbm] user does not exist")
            self.users.insert_one({
                "_id": sub,
                "name": name,
                "email": email
            })
        else:
            print("...[dbm] user exists")

    # UPLOADS
    def save_upload(self, upload_info, upload_json, id_token):
        print ("...[dbm] save upload", upload_json==None,upload_info)
        # Used for user_id
        sub = auth_utils.validate_g_token(id_token=id_token)["sub"]
        # metadata for an upload in db.uploads shares same id as db.pairwise_interactions/observations/parameters/probabilities
        meta = self.uploads.insert_one({
            "user_id": sub,
            "datetime": upload_info["datetime"],
            "type": upload_info["type"],
            "filename": upload_info["filename"],
            "success": upload_json["success"],
            "comments": upload_json["comments"]
        })
        upload_type = upload_info["type"]
        if upload_type == "pathway":
            collection = self.pairwise_interactions
        elif upload_type == "observation":
            collection = self.observations
        elif upload_type == "parameters":
            collection = self.parameters
        elif upload_type == "probabilities":
            collection = self.probabilities
        upload = collection.insert_one({
            "_id": meta.inserted_id,
            "user_id": sub,
            "data": upload_json["data"],
            "filename": upload_info["filename"]
        })

    # Get all users uploads
    def get_uploads_list(self, id_token):
        sub_uid = auth_utils.validate_g_token(id_token=id_token)["sub"]
        print("...[dbm] get all uploads: {0}".format(sub_uid))
        uploads_cursor = self.uploads.find({"user_id":sub_uid}).sort([("datetime", ASCENDING)])
        return json_util.dumps(uploads_cursor)
