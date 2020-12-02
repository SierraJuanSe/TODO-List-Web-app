from models.team import Team
from models.user import User
from bson.objectid import ObjectId


# newTeam = Team(name='equipo01', desc='descEquipo01')

# if newTeam.create_team():
#     user = User(email='test@test.com')
#     if user.query_user():
#         pastTeam = Team(code=newTeam.code)
#         if pastTeam.query_by_code():
#             print(user.join_team(pastTeam.team_id))
#             print(user.get_my_teams())
