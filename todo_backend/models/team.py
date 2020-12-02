"""
Modelo DAO de los equipos de trabajo

"""

from utils.connector import Connector


class Team:
    """ Modelo Equipo conectado a la base de datos """

    def __init__(self, team_id=None, name=None, desc=None, code=None):
        """ init del modelo equipo """
        self.team_id = team_id
        self.name = name
        self.desc = desc
        self.code = code

    def query_by_code(self):
        """ consulta de un equipo por su codigo de acceso """
        conn = Connector()
        teams = conn.get_teams_collection()

        data = teams.find_one({'code': self.code})
        if data:
            self.team_id = data['_id']
            self.name = data['name']
            self.desc = data['desc']
            return True
        return False

    def query_members(self):
        """ consulta  los miembros de un equipo """
        conn = Connector()
        teams = conn.get_teams_collection()

        pipeline = [
            {
                "$match": {
                    '_id': self.team_id
                }
            },
            {
                "$lookup": {
                    'from':  'users',
                    'let': {'team_id': '$_id'},
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    # '$eq': ['$email', 'test@test.com']
                                    '$in': ['$$team_id', '$teams']
                                }
                            }
                        },
                        {
                            '$project': {
                                '_id': {'$toString': '$_id'},
                                'email': 1,
                                'fname': 1,
                                'lname': 1,
                            }
                        }
                    ],
                    'as': 'team_members'
                }
            }
        ]

        return [u['team_members'] for u in teams.aggregate(pipeline)]

    def query_todos(self):
        """ consulta  los todos de un equipo """
        conn = Connector()
        teams = conn.get_teams_collection()

        pipeline = [
            {
                "$match": {
                    '_id': self.team_id
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

        return [t['team_todos'] for t in teams.aggregate(pipeline)]

    def create_team(self):
        """ creacion de un equipo de trabajo """
        conn = Connector()
        teams = conn.get_teams_collection()
        insert_result = teams.insert_one({
            'name': self.name,
            'desc': self.desc,
            'code': None
        })

        if insert_result.acknowledged:
            self.team_id = insert_result.inserted_id
            self.generate_team_code()
            return self.update_code()

    def update_code(self):
        """ actualiza el codigo de acceso al equipo """
        conn = Connector()
        teams = conn.get_teams_collection()

        new_data = {'code': self.code}
        update_result = teams.update_one(
            {'_id': self.team_id}, {'$set': new_data})

        return True if update_result.acknowledged else False

    def generate_team_code(self):
        """ genera el codigo de acceso """
        self.code = str(self.team_id)[-6:]
