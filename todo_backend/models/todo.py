"""
Modelo DAO de los todo con el cual se hace la relacion con la base de datos para almacenar y consultar la informacion de los TODOS de cada usuario en la aplicacion
"""
from utils.connector import Connector


class Todo:
    """ Modelo TODO conectado a la base de datos """
    def __init__(self, todo_id=None, title=None, description=None, create_date=None, end_date=None, status=0, owner_id=None):
        self.todo_id = todo_id
        self.title = title
        self.description = description
        self.create_date = create_date
        self.end_date = end_date
        self.status = status
        self.owner_id = owner_id


    def count_my_todos(self):
        conn = Connector()
        todos = conn.get_todos_collection()
        return todos.count_documents({"owner_id":self.owner_id})


    def query_all_my_todos(self):
        conn = Connector()
        todos = conn.get_todos_collection()
        return todos.find({"owner_id":self.owner_id})


    def query_todo(self):
        conn = Connector()
        todos = conn.get_todos_collection()
        data = todos.find({"owner_id":self.owner_id, "_id":self.todo_id})
        
        if data:
            self.id = data["_id"]
            self.title = data["title"]
            self.description = data["description"]
            self.create_date = data["create_date"]
            self.end_date = data["end_date"]
            self.status = data["status"]
            self.owner_id = data["owner_id"]
            return True
        else:
            return False

    def insert_todo(Self):
        

    def update_todo(self):
        pass


    def delete_todo(self):
        pass


    def change_status_todo(self):
        pass


