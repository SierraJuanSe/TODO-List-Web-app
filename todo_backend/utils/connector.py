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
   def __init__(self):
       self.uri = "mongodb+srv://adminuser:admin1234@cluster-todo.uf1xn.mongodb.net/<dbname>?retryWrites=true&w=majority"
       self.client = MongoClient(self.uri)

   def get_client(self):
       return self.client

   def get_db(self):
       return self.client['todoapp']

   def get_user_collection(self):
       return self.client['todoapp'].users

   def get_todos_collection(self):
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
