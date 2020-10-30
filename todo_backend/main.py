"""
Controlador principal del backend de la aplicacion de TODO-LIST.
Encargado de recibir y reenviar peticiones HTTP al cliente conectando el modelo (encargado de las petciones a la pase de datos) con la vista (el navegador del cliente).
Este controlador utiliza el micro framework flask unicamente para recibir y responder a las peticiones HTTP del cliente, no se utiliza el framwork para renderisar templates u otras cosas.

A pesar de implementar el backend como una API de microservicios, se mantiene la arquitectura MVC y la API solo funciona como controlador entre vista y modelo, que permite tener el front end en arquitectura de single page aplication sin tener que recargar la pagina, forma bastante util para el pryecto de una lista de TODOS.
"""
from models.user import User
from models.todo import Todo

