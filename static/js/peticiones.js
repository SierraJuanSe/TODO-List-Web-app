const url = "http://ec2-3-84-191-165.compute-1.amazonaws.com/";
var token = "";

async function crearCuenta(nombre, apellido, correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contraseña
    }
    try {
        result = await $.ajax({
            url: url + "/user",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 201) {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error)
        if (error.status == 403) {
            return -2;
        } else {
            return 0;
        }
    }

}

async function login(correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "password": contraseña
    }
    try {
        result = await $.ajax({
            url: url + "/login",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            window.token = result.data["userid"];
            console.log(window.token);
            setCookie(token);
            console.log(token);
            return {"nombre":result.data['fname'],"apellido":result.data['lname']};
        } else {
            return 0;
        }
    } catch (error) {
        return 0;
    }

}

async function consultarTodo() {

    try {
        result = await $.ajax({
            url: url + "/todo",
            type: "GET",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers : {"userid" : readCookie('token')}
        })
        if (result.status == 200) {
            console.log(result)
            traerTodos(result.data.todos);
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

async function crearTodo(titulo, descripcion, fecha,fechaCreacion) {
    data={
        "title" : titulo,
        "description" : descripcion,
        "create_date" :  fechaCreacion,
        "end_date" :  fecha
    }
    try {
        result = await $.ajax({
            url: url + "/todo",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers : {"userid" : readCookie('token')}
        })
        if (result.status == 201) {
            return {"idTodo":result.data['todo_id']};
        } else {
            return 0;
        }
    } catch (error) {
        return 0;
    }
}



async function BorrarTodo(codigoTodo) {
    data={
        "todo_id": codigoTodo,
    }
    try {
        result = await $.ajax({
            url: url + "/todo",
            data: JSON.stringify(data),
            type: "DELETE",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers : {"userid" : readCookie('token')}
        })
        if (result.status == 200) {
            return 1
        } else {
            return 0;
        }
    } catch (error) {
        console.log(result)
        return 0;
    }
}

async function actualizarTodo(idTodo, estado) {
    data={
        "todo_id": idTodo,
        "todo_status": estado
    }
    try {
        result = await $.ajax({
            url: url + "/todo",
            data: JSON.stringify(data),
            type: "PUT",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers : {"userid" : readCookie('token')}
        })
        if (result.status == 200) {
            return 1
        } else {
            return 0;
        }
    } catch (error) {
        console.log(result)
        return 0;
    }


}

function crearComentario(idTodo, coment) {
    return true;
}

function crearTodoEquipo(idEquipo,titulo, descripcion, fecha,fechaCreacion) {
    console.log(idEquipo+titulo)
    return true;
}

async function crearEquipo(nombre,descripcion){
return true;
}

async function consultarEquipos(nombre,descripcion){

}

async function consultarInfoEquipos(idEquipo){
return true;
}


async function UnirEquipo(cod){
return true;
}



function setCookie(token) {
    document.cookie = "token=" + encodeURIComponent(token) + "; max-age=3600; path=/";
}
function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
function deleteCookie() {
    document.cookie = "token=; max-age=0; path=/";
}