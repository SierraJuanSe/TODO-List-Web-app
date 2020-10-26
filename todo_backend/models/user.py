"""
Modelo DAO de los usuarios con el cual se hace la relacion con la base de datos para almacenar y consultar la informacion de los usuarios de la aplicacion.
"""
from utils.connector import Connector

class User:
    """Modelo Usuario connectado a la base de datos"""

    def __init__(self, user_id=None, email=None, fname=None, lname=None, password=None):
        """ init del modelo usuario"""
        self.user_id = user_id
        self.email = email
        self.fname = fname
        self.lname = lname
        self.password = password
        self.todos = []


    def count_users(self):
        """ Cuenta el numero de usuario almacenados """
        conn = Connector()
        users = conn.get_user_collection()
        return users.count_documents({})
    

    def query_all_users(self):
        """ consulta y trae todos los usuarios almacenados"""
        conn = Connector()
        users = conn.get_user_collection()
        return users.find({})


    def query_user(self):
        """ Consulta un usuario por correo y contrasena y actualiza los datos de la instancia """
        conn = Connector()
        users = conn.get_user_collection()
        data = users.find_one({"email": self.email}, {"email":1, "fname":1, "lname":1})
        if data:
            self.user_id = data["_id"]
            self.email = data['email']
            self.fname = data['fname']
            self.lname = data['lname']
            return True
        else:
            return False

    def login_user(self):
        """ Consulta un usuario por correo y contrasena y actualiza los datos de la instancia """
        conn = Connector()
        users = conn.get_user_collection()
        data = users.find_one({"email": self.email, "password": self.password}, {"email":1, "fname":1, "lname":1})
        if data:
            self.user_id = data["_id"]
            self.email = data['email']
            self.fname = data['fname']
            self.lname = data['lname']
            return True
        else:
            return False



    def insert_user(self):
        """ Inserta un nuevo usuario a la base de datos si no existe """
        conn = Connector()
        users = conn.get_user_collection()

        if not self.query_user() and self.email and self.password:
            insert_result = users.insert_one({
                "email":self.email,
                "fname":self.fname,
                "lname":self.lname,
                "password":self.password,
                "todos":self.todos
                })
            if insert_result.acknowledged:
                self.user_id = insert_result.inserted_id
                return 1
            else:
                return 0
        else:
            return -1


    def update_user(self):
        """" Actualiza la informacion de un usuario """
        conn = Connector()
        users = conn.get_user_collection()
        new_data = {}
        if self.fname:
            new_data["fname"] = self.fname
        if self.lname:
            new_data["lname"] = self.lname
        if self.password:
            new_data["password"] = self.password


        update_result = users.update_one({"_id":self.user_id}, {"$set": new_data})
        return True if update_result.acknowledged else False
        

    def delete_user(self):
        """ Elimina el usuario de la base de datos """
        conn = Connector()
        users = conn.get_user_collection()
        delete_result = users.delete_one({"_id":self.user_id})
        return True if delete_result else False




