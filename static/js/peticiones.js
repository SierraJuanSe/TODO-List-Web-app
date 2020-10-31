const url="http://ec2-3-93-58-254.compute-1.amazonaws.com";

async function crearCuenta(nombre, apellido, correo, contraseña) {
    let result;
    let data={
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password" : contraseña 
    }
    try {
        result=await $.ajax({
            url: url+ "/user",
            data: JSON.stringify(data),
            type: "POST",
            dataType : 'json',
            contentType: "application/json; charset=utf-8"
        })
    if (result.status==201) {
        return 1;
    }else{
        return 0;
    }
    } catch (error) {
        console.log(error)
        if (error.status==403) {
            return -2;
        }else{
            return 0;
        }
    }

    // await $.ajax({
	// 	url: url+ "/user",
	// 	data: JSON.stringify(data),
    //     type: "POST",
	// 	dataType : 'json',
	// 	contentType: "application/json; charset=utf-8"
	// }).done(function(data){
    //     alert(data.status+" se creo")
    //     return true;
	// }).fail(function(data){
    //     alert(data.status)
    //     return false;
	// });
    
}

function login(correo, contraseña) {

    return true;
}

function consultarTodo() {
    return 0;
}

function crearTodo(titulo, descripcion, fechaCreacion, estado) {
    // usuario={
    //     "titulo":nombre,
    //     "descripcion":apellido,
    //     "correo":correo,
    //     "contraseña":contraseña
    // }
    return true;
}

function BorrarTodo(codigoTodo) {
    return true;
}

function actualizarTodo(idTodo,estado) {
    return true;
}

function crearComentario(idTodo, coment) {
    return true;
}

function pintarNombre(nombre){

}