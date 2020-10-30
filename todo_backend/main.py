"""
Controlador principal del backend de la aplicacion de TODO-LIST.
Encargado de recibir y reenviar peticiones HTTP al cliente conectando el modelo (encargado de las petciones a la pase de datos) con la vista (el navegador del cliente).
Este controlador utiliza el micro framework flask unicamente para recibir y responder a las peticiones HTTP del cliente, no se utiliza el framwork para renderisar templates u otras cosas.

A pesar de implementar el backend como una API de microservicios, se mantiene la arquitectura MVC y la API solo funciona como controlador entre vista y modelo, que permite tener el front end en arquitectura de single page aplication sin tener que recargar la pagina, forma bastante util para el pryecto de una lista de TODOS.
"""
import datetime
from models.user import User
from models.todo import Todo

user = User(email = "juan3@gmail.com", password="1234", fname="Sebastian", lname="sier")

if user.insert_user() == 1:
    print(user.count_users())
    print(user.login_user())
    print(user.user_id)

    todo = Todo(title="first todo", description = "this is my first todo", create_date = datetime.datetime.now(), owner_id = user.user_id)

    if todo.insert_todo():
        print(f"Todo inserted id: {todo.todo_id}")
"""
else:
    print('Ya existe')
    print(user.user_id)
    user2 = User(user_id = user.user_id, lname='sierra', password='newpass2')
    if user2.update_user():
        print('Actualizado' + str(user2.user_id))
        if user2.delete_user():
            print('Usuario eliminado')
        else:
            print('No se elimino ningun usuario')

    else:
        print('no se actualizo error')
"""

if user.login_user():
    print(user.__dict__)
    todo = Todo(title="first todo", description = "this is my first todo", create_date = datetime.datetime.now(), owner_id = user.user_id)

    """if todo.insert_todo():
        print(f"Todo inserted id: {todo.todo_id}")
    """
    mytodos = Todo(owner_id=user.user_id).query_all_my_todos()
    listtodos = list(mytodos)
    one_todo = listtodos[0]
    todo2 = Todo(todo_id = one_todo['_id'], owner_id=user.user_id, status=True)
    todo2.change_status_todo()
    todo2.query_todo()
    print(todo2.__dict__)

    if todo2.delete_todo():
        print('todo deleted')
    
    


