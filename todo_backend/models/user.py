"""
Modelo DAO de los usuarios con el cual se hace la relacion con la base de datos para almacenar y consultar la informacion de los usuarios de la aplicacion.
"""
from utils.connector import Connector

class User:

    def __init__(self, user_id="", email="", fname="", lname="", password=""):
        self.user_id = user_id
        self.email = email
        self.fname = fname
        self.lname = lname
        self.password = password


    def query_user():
        conn = Connector


