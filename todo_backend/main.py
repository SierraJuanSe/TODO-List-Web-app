"""
Controlador principal del backend de la aplicacion de TODO-LIST.
Encargado de recibir y reenviar peticiones HTTP al cliente conectando el modelo (encargado de las petciones a la pase de datos) con la vista (el navegador del cliente).
Este controlador utiliza el micro framework flask unicamente para recibir y responder a las peticiones HTTP del cliente, no se utiliza el framwork para renderisar templates u otras cosas.

A pesar de implementar el backend como una API de microservicios, se mantiene la arquitectura MVC y la API solo funciona como controlador entre vista y modelo, que permite tener el front end en arquitectura de single page aplication sin tener que recargar la pagina, forma bastante util para el pryecto de una lista de TODOS.
"""
from models.user import User

user = User(email = "juan3@gmail.com", password="1234", fname="Sebastian", lname="sier")

if user.insert_user() == 1:
    print(user.count_users())
    print(user.login_user())
    print(user.user_id)

else:
    print('Ya existe')
    print(user.user_id)
    user2 = User(user_id = user.user_id, lname='sierra', password='newpass2')
    if user2.update_user():
        print('Actualizado' + str(user2.user_id))
        if user2.delet_user():
            print('Usuario eliminado')
        else:
            print('No se elimino ningun usuario')

    else:
        print('no se actualizo error')


