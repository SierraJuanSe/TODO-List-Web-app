"""
Modulo para la conexion con la base de datos en mongo DB.
La Clase Conector permite:
    1. crear la conexion con la base de datos
    2. retornar un cliente de la base de datos
    3. retornar la isntancia de la base de datos
    4. retornar una instancia de la coleccion users (igual que una tabla)
    5. retornar una instancia de la coleccion todos (igual que una tabla)
"""
from pymongo import MongoClient


class Connector:
    """ Clase que connecta la base de datos con el modelo"""
    def __init__(self):
        """ Inicio de la base de datos con la uri"""
        self.uri = "mongodb+srv://adminuser:admin1234@cluster-todo.uf1xn.mongodb.net/<dbname>?retryWrites=true&w=majority"
        self.client = MongoClient(self.uri)

    def get_client(self):
        """ Retorna un cliente de la conexion"""
        return self.client

    def get_db(self):
        """ retorna la isntancia a la base de datos todoapp"""
        return self.client['todoapp']

    def get_user_collection(self):
        """ retorna la instancia de usuarios de la base de datos"""
        return self.client['todoapp'].users

    def get_todos_collection(self):
        """ retorna la isntancia de todos de la base de datos """
        return self.client['todoapp'].todos





if __name__ == '__main__':
    conn = Connector()
    client = conn.get_client()
    print(client.stats)
    print(client.list_database_names())
    tododb = conn.get_db()
    print(tododb.list_collection_names())

    users = conn.get_user_collection()
    todos = conn.get_todos_collection()

    print(users.count_documents({}))
    print(todos.count_documents({}))