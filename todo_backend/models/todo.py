"""
Modelo DAO de los todo con el cual se hace la relacion con la base de datos para almacenar y consultar la informacion de los TODOS de cada usuario en la aplicacion
"""
from utils.connector import Connector


class Todo:
    """ Modelo TODO conectado a la base de datos """

    def __init__(self, todo_id=None, title=None, description=None, create_date=None, end_date=None, status=False, owner_id=None, team_id=None):
        """Init del modelo todo"""
        self.todo_id = todo_id
        self.title = title
        self.description = description
        self.create_date = create_date
        self.end_date = end_date
        self.status = status
        self.owner_id = owner_id
        self.team_id = team_id

    def count_my_todos(self):
        """ Retorna la cantidad de todos de un usuario """
        conn = Connector()
        todos = conn.get_todos_collection()
        return todos.count_documents({"owner_id": self.owner_id})

    def query_all_my_todos(self):
        """ Retorna todos los todos de un usario """
        conn = Connector()
        todos = conn.get_todos_collection()
        return todos.find({"owner_id": self.owner_id, 'team_id': None})

    def query_todo(self):
        """ Retorna el todo consultado en caso de que exista """
        conn = Connector()
        todos = conn.get_todos_collection()
        data = todos.find_one({"owner_id": self.owner_id, "_id": self.todo_id})

        if data:
            self.id = data["_id"]
            self.title = data["title"]
            self.description = data["description"]
            self.create_date = data["create_date"]
            self.end_date = data["end_date"]
            self.status = data["status"]
            self.owner_id = data["owner_id"]
            self.team_id = data["team_id"]
            return True
        else:
            return False

    def insert_todo(self):
        """Inserta un nuevo todo creado por un usuario """
        conn = Connector()
        todos = conn.get_todos_collection()

        insert_result = todos.insert_one({
            "title": self.title,
            "description": self.description,
            "create_date": self.create_date,
            "end_date": self.end_date,
            "status": self.status,
            "owner_id": self.owner_id,
            "team_id": self.team_id
        })
        if insert_result.acknowledged:
            self.todo_id = insert_result.inserted_id
            return 1
        else:
            return 0

    def update_todo(self):
        """ Actualiza la informacion de un TODO """
        pass

    def delete_todo(self):
        """ Elimina un TODO """
        conn = Connector()
        todos = conn.get_todos_collection()
        delete_result = todos.delete_one(
            {"_id": self.todo_id, 'owner_id': self.owner_id})
        return True if delete_result.deleted_count else False

    def change_status_todo(self):
        """ Cambia el estatus de un TODO a terminado o a sin terminar """
        conn = Connector()
        todos = conn.get_todos_collection()
        new_data = {"status": self.status}
        update_result = todos.update_one(
            {"_id": self.todo_id}, {"$set": new_data})
        return True if update_result.acknowledged else False
