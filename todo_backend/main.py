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

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Rest API for TODO list web app'

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
            return jsonify(status_code=201, status_message='User registered'), 201
        elif insert_result == -1:
            return jsonify(status_code=403, status_message='User already exists') , 403
        else:
            return jsonify(status_code=500, status_message='Problem to save user in database'), 500

    elif request.method == 'GET':
        # consulta para el login de un ususario ya existente
        req_data = request.get_json()
        user = User(email=req_data['email'], password=req_data['password'])

        login_result = user.login_user()
        if login_result:
            data = {'user_id':str(user.user_id), 'email':user.email, 'fname':user.fname, 'lname':user.lname}
            return jsonify(status_code=200, status_message='User found', data=data)
        else:
            return jsonify(status_code=404, status_message='User not found'), 404



# respuestas para las peticiones referentes a los todos controlador todos        
@app.route('/todo', methods=['GET', 'POST', 'PUT', 'DELETE'])
def todo_controller():

    if request.method == 'POST':
        # Creacion y almecenamiento de un nuevo todo
        pass
    elif request.method == 'GET':
        # Consulta yu retorno de los todos del usuario
        pass
    elif request.methos == 'PUT':
        # Actualizacion de los datos del todo o del estado
        pass
    elif request.method == 'DELETE':
        # Eliminacion de un todo
        pass



if __name__ == '__main__':
    app.run(debug=True)
