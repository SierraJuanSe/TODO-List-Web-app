import datetime


def dateformat(date):
    # cambia el formato de la fecha del JSON
    return datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')


def list_todos_format(todos):
    # convierte el id de los todos en un string
    todo_list = []
    for todo in todos:
        todo['_id'] = str(todo['_id'])
        todo_list.append(todo)

    return todo_list
