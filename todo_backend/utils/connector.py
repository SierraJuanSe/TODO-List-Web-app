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
from bson.objectid import ObjectId


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
        """ retorna la instancia de todos de la base de datos """
        return self.client['todoapp'].todos

    def get_teams_collection(self):
        """ retrona la instancia de equipos de la base de datos """
        return self.client['todoapp'].teams


if __name__ == '__main__':
    conn = Connector()
    client = conn.get_client()
    # print(client.stats)
    # print(client.list_database_names())
    tododb = conn.get_db()
    # print(tododb.list_collection_names())

    users = conn.get_user_collection()
    todos = conn.get_todos_collection()
    teams = conn.get_teams_collection()

    # print(users.count_documents({}))
    # print(todos.count_documents({}))
    # print(teams.count_documents({}))

    pipeline = [
        {
            "$match": {
                '_id': ObjectId('5fc3cae215019ff3676c7e73')
            }
        },
        {
            "$lookup": {
                'from':  'todos',
                'let': {'team_id': '$_id'},
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': ['$team_id', '$$team_id']
                            }
                        }
                    },
                    {
                        '$project': {
                            '_id': {'$toString': '$_id'},
                            'title': 1,
                            'description': 1,
                            'end_date': 1,
                            'status': 1,
                            'owner_id': 1,
                            'team_id': {'$toString': '$team_id'}
                        }
                    }
                ],
                'as': 'team_todos'
            }
        }
    ]
    result = [u['team_todos'] for u in teams.aggregate(pipeline)]
    print(result)
