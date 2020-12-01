"""
Controlador principal del backend de la aplicacion de TODO-LIST.
Encargado de recibir y reenviar peticiones HTTP al cliente conectando el modelo (encargado de las petciones a la pase de datos) con la vista (el navegador del cliente).
Este controlador utiliza el micro framework flask unicamente para recibir y responder a las peticiones HTTP del cliente, no se utiliza el framwork para renderisar templates u otras cosas.

A pesar de implementar el backend como una API de microservicios, se mantiene la arquitectura MVC y la API solo funciona como controlador entre vista y modelo, que permite tener el front end en arquitectura de single page aplication sin tener que recargar la pagina, forma bastante util para el pryecto de una lista de TODOS.
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from bson.objectid import ObjectId

from models.user import User
from models.todo import Todo
from utils.format import dateformat, list_todos_format

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'Rest API for TODO list web app'


@app.route('/login', methods=['POST'])
def user_login():
    if request.method == 'POST':
        # consulta para el login de un ususario ya existente
        req_data = request.get_json()
        user = User(email=req_data['email'], password=req_data['password'])

        login_result = user.login_user()
        if login_result:
            data = {'userid': str(
                user.user_id), 'email': user.email, 'fname': user.fname, 'lname': user.lname}
            return jsonify(status=200, status_message='User found', data=data)
        else:
            return jsonify(status=404, status_message='User not found'), 404


# respuestas para las peticiones referentes a los usuarios controlador usuarios
@app.route('/user', methods=['GET', 'POST'])
def user_controller():

    if request.method == 'POST':
        # creacion y almacenamieto de un nuevo usuario
        req_data = request.get_json()
        newUSer = User(
            email=req_data['email'],
            fname=req_data['fname'],
            lname=req_data['lname'],
            password=req_data['password'])

        insert_result = newUSer.insert_user()
        if insert_result == 1:
            return jsonify(status=201, status_message='User registered'), 201
        elif insert_result == -1:
            return jsonify(status=403, status_message='User already exists'), 403
        else:
            return jsonify(status=500, status_message='Problem to save user in database'), 500


# respuestas para las peticiones referentes a los todos controlador todos
@app.route('/todo', methods=['GET', 'POST', 'PUT', 'DELETE'])
def todo_controller():

    if request.method == 'POST':
        # Creacion y almecenamiento de un nuevo todo
        userid = request.headers['userid']
        req_data = request.get_json()
        newTodo = Todo(
            title=req_data['title'],
            description=req_data['description'],
            create_date=req_data['create_date'],
            end_date=req_data['end_date'],
            owner_id=userid)

        insert_result = newTodo.insert_todo()
        if insert_result:
            data = {'userid': str(newTodo.owner_id),
                    'todo_id': str(newTodo.todo_id)}
            return jsonify(status=201, status_message='todo created', data=data), 201
        else:
            return jsonify(status=500, status_message='todo not created'), 500

    elif request.method == 'GET':
        # Consulta yu retorno de los todos del usuario
        userid = request.headers['userid']
        todos = Todo(owner_id=userid)

        mytodos = list_todos_format(todos.query_all_my_todos())
        data = {
            'info': {'userid': todos.owner_id, 'total': len(mytodos)},
            'todos': mytodos}
        return jsonify(status=200, status_message='todos returned', data=data)

    elif request.method == 'PUT':
        # Actualizacion de los datos del todo o del estado
        userid = request.headers['userid']
        req_data = request.get_json()
        todo = Todo(todo_id=ObjectId(
            req_data['todo_id']), owner_id=userid, status=req_data['todo_status'])
        update_result = todo.change_status_todo()
        if update_result:
            data = {'info': {'userid': todo.owner_id,
                             'todo_id': str(todo.todo_id)}}
            return jsonify(status=200, status_message='todo status updated', data=data)
        else:
            return jsonify(status=500, status_message='todo status not updated'), 500

    elif request.method == 'DELETE':
        # Eliminacion de un todo
        userid = request.headers['userid']
        req_data = request.get_json()
        todo = Todo(todo_id=ObjectId(
            req_data['todo_id']), owner_id=userid)

        delete_result = todo.delete_todo()
        if delete_result:
            data = {'info': {'userid': todo.owner_id,
                             'todo_id': str(todo.todo_id)}}
            return jsonify(status=200, status_message='todo deleted', data=data)
        else:
            return jsonify(status=500, status_message='todo not deleted'), 500


@app.route('/teams/<user_id>', methods=['GET', 'POST'])
def all_teams(user_id):
    response = {}
    if request.method == 'GET':
        user = User(user_id=ObjectId(user_id))
        response['teams'] = user.get_my_teams()
        response['status'] = 200

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
