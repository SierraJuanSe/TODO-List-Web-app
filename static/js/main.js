// $("#wrapper").hide();
$("#Cuenta").click(function () {
    // Animacion para mostrara el regiitro:
    $("#Registro").removeClass("animate__animated animate__backOutRight");
    $("#login").removeClass("animate__backInLeft");
    $("#login").addClass(" animate__backOutLeft");
    $("#Registro").addClass("animate__animated animate__backInRight");
    $('#Registro').show();
});

$("#cancelarCuenta").click(function () {
    // Animacion para cancelar el registro:
    $("#Registro").removeClass("animate__animated animate__backInRight");
    $("#login").removeClass("animate__backOutLeft");
    $("#Registro").addClass("animate__animated animate__backOutRight");
    $("#login").addClass("animate__animated animate__backInLeft");
});


$("#CrearCuenta").click(function () {
    //Recoleccion de datos
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    correo = $("#email").val();
    contraseña = $("#password").val();
    contraseña1 = $("#verifypass").val();
    //Verifica la contraseña
if (nombre && apellido && correo && contraseña) {
    if (contraseña == contraseña1 && correo.includes('@')) {
        envioCuenta(nombre, apellido, correo, contraseña);
    } else if (!correo.includes('@')) {
        swal("Error", "Correo incorrecto", "error");
    } else {
        //alerta incorrecta
        swal("Error", "Verificacion de contraseña incorrecto", "error");
    }
} else {
    swal("Error", "verifica si ingresaste todos los datos", "error");
}
});

async function envioCuenta(nombre, apellido, correo, contraseña) {
    var envio = await crearCuenta(nombre, apellido, correo, contraseña)
    if (envio == 1) {
        //alerta correcta
        swal("Cuenta creada correctamente", "Estas listo para administrar tus tareas", "success")
            .then((value) => {
                // Animacion de creacion de usuario
                $("#Registro").removeClass("animate__animated animate__backInRight");
                $("#login").removeClass("animate__backOutLeft");
                $("#Registro").addClass("animate__animated animate__backOutRight");
                $("#login").addClass("animate__animated animate__backInLeft");
            });
        //alerta incorrecta
    } else if (envio == 0) {
        swal("Error", "Revisa si ingresaste los datos correctamente", "error");
    } else {
        swal("Error", "Ya existe una cuenta con el correo ingresado", "error");
    }


}


//soo llamar aogin
$("#Ingresar").click(function () {
    $("#alertaLogin").empty(); //vacia el div de alertas
    //Lectura de datos
    correo = $("#emailLogin").val();
    contraseña = $("#passwordLogin").val();
    if (correo == "" || contraseña == "") { //valida que no sen nulos
        //Envio de alerta
        $("#alertaLogin").append('<div class="alert alert-danger" role="alert">Error, por favor ingresa todo los datos</div>')

    } else {
        enviarLogin(correo, contraseña)
    }

});

async function enviarLogin(correo, contraseña) {
    //Invoca a metodo de peticion
    var result = await login(correo, contraseña);
    if (result) {
        consultarTodo();
        mostrarPaginaPrincipal();
        pintarNombre(result.nombre, result.apellido);
    } else {
        //Envio de alerta
        $("#alertaLogin").append('<div class="alert alert-danger" role="alert">Error, intentalo nuevamente</div>')
    }
}

//La Funcion muetsra el nombre del usuario autenticado
function pintarNombre(nombre, apellido) {
    $("#nombreUser").empty();
    $("#nombreUser").append('<h3>' + nombre + ' ' + apellido + '</h3>')
}

//Muestra la pagina luego de ser autenticado
function mostrarPaginaPrincipal() {
    $('#fondo').hide();
    $("#wrapper").show();
}

$("#cerrarsesion").click(function () {
    // $("#Todos").empty();
    location.reload();
    // $("#wrapper").hide(700);
    // $('#fondo').show(700);
});

//Boton para habilitar el menu Hamburguesa
$('#menu_on').click(function () {
    $('body').toggleClass('visible_menu');
})

//Boton para crear un Todo
$("#botonCrearTodo").click(function () {
    $('#nuevot').hide(700);
    $("#crearT").show(700);
});

//Boton que recoje datos para crear un todo y luego llama a su repsectiva funcion
id = 0;
$("#Creartodo").click(function () {
    id += 1;
    titulo = $('#titulo').val();
    des = $('#Descripcion').val();
    Fecha = $('#fechalimite').val();
    // alert(JSON.stringify({ "fecha": Fecha }));
    if (enviarTODO(titulo, des, Fecha)) {
        titulo = $('#titulo').val("");
        des = $('#Descripcion').val("");
        Fecha = $('#fechalimite').val("");
    }

});

//Funcion que recibe los datos de un todo para enviarlos al llamado ajax
async function enviarTODO(titulo, des, Fecha) {
    if (titulo == "") {
        swal("Error", "Ingresas todos los datos", "error");
    } else {
        var d = new Date();
        FechaCreacion = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
        var result = await crearTodo(titulo, des, Fecha,FechaCreacion);
        if (result) {
            $('#nuevot').show(700);
            $("#crearT").hide(700);
            pruebaComents = { "0": { "c": 'Comentario1' }, "1": { "c": 'Comentario2' }, "2": { "c": 'Comentario3' } };
            pintarTODO(result.idTodo, titulo, Fecha, des, pruebaComents);
            return true

        } else {
            swal("Error", "Revisa si ingresaste los datos correctamente", "error");
            return false
        }
    }
}

//Boton cancela la creacion de un todo
$("#cancelartodo").click(function () {
    $('#nuevot').show(700);
    $("#crearT").hide(700);
});

//Actualiza los ToDo que estan en la base de datos
$("#seccionTodo").click(function () {
consultarTodo();
});

//Funcion que recibe los todos del back
function traerTodos(todos) {
    $("#Todos").empty();
    for (const todo of todos) {
        pintarTODO(todo['_id'],todo['title'],todo['end_date'],todo['description'],[],todo['status']);
    }
}

//Esta funcion muestra los todos que llegan como argmento en la interfaz grafica
function pintarTODO(id, Titulo, Fecha, Descripcion, comentarios,estado) {
    
    com = "";
    for (var i in comentarios) {
        com += '<div class="card" style="width: 45rem;left:18%;">' +
            '<div class="card-body"><b class="card-title">Comentario <div id="deleteComent"' + id + ' class="material-icons float-right">delete</div>  </b><p class="card-text">' + comentarios[i].c + '</p></div></div>';
    }
    TODO = "";
    TODO = '<div id="' + id + '"><div class="card bg-light mb-3 " style="max-width: 50rem; left: 15%;">' +
        '<div class="card-header"><div class="row"><div class="col-1"><div class="custom-control custom-checkbox" id="check" style="width: 70%;">' +
        '<input type="checkbox" class="custom-control-input" id="customCheck' + id + '"><label class="custom-control-label" for="customCheck' + id + '"></label></div></div>' +
        '<div class="col-10"><h4 id="titulo' + id + '"><b>' + Titulo + '</b></h4></div></div></div><div class="card-body"><h6 id="des' + id + '">' + Descripcion + '</h6>' +
        '<div class="row" ><div class="col" ><p id="Fecha' + id + '" class="card-text">' + Fecha + '</p></div><div class="col-8" > </div><div class="col-2" ><div id="delete' + id + '" class=" material-icons puntero">delete</div>' +
        '<div id="abrircoment' + id + '" class=" material-icons puntero">comment</div></div></div></div>' +
        '<div class="input-group" id="inComentarios' + id + '"style="max-width: 47rem;left: 6%; display: none;">' +
        '<input ID="inputcomentario' + id + '" type="text" class="form-control" placeholder="Ingresa tu comentario"><br>' +
        '<div class="input-group-btn"><button id="eComent' + id + '" class="btn btn-light" type="button">' +
        '<div class="material-icons" style>send</div><button id="cancComent' + id + '" class="btn btn-light" type="button">' +
        '<div class="material-icons">cancel</div></button></div></div></div><div id="Comentarios' + id + '" style="display:none;">' + com + '</div></div><br>';
    $("#Todos").append(TODO);
    //Llama  acada funcion para dare acciones a cada boton del todo
    checkbox(id,estado);
    abrirCancelarComment(id);
    botonBorrar(id);
    botoncrearComentario(id);
}

// Toda la parte de darle funciones a los botones de cada TODO
//Da acciones a el checbox del todo
function checkbox(id,estado) {
    $("#customCheck" + id).click(function () {
        accionesCheck(id,estado);
    });
    if (estado) {
        $("#customCheck" + id).prop("checked", true);
        $("#titulo" + id).addClass("tachado");
        $("#Fecha" + id).addClass("tachado");
        $("#des" + id).addClass("tachado");
    }
}

//Da acciones a el checbox del todo
async function accionesCheck(id) {


    if ($("#customCheck" + id).is(':checked')) {
        var result= await actualizarTodo(id, true); 
        if (result) {
            $("#titulo" + id).addClass("tachado");
            $("#Fecha" + id).addClass("tachado");
            $("#des" + id).addClass("tachado");
            $("#" + id).addClass("animate__animated animate__heartBeat");
        } else {
            $("#customCheck" + id).prop("checked", false);
            swal("Error", "No se pudo actualizar a realizado", "error");
        }
    } else {
        var result= await actualizarTodo(id, false); 
        if (result) {
            $("#titulo" + id).removeClass("tachado");
            $("#Fecha" + id).removeClass("tachado");
            $("#des" + id).removeClass("tachado");
        } else {
            $("#customCheck" + id).prop("checked", true);
            swal("Error", "No se pudo actualizar a no realizado", "error");
        }
    }
}



//Da acciones a el boton de comentarios del TODO
señal = false;
function abrirCancelarComment(id) {
    $("#abrircoment" + id).click(function () {
        if (señal == false) {
            $("#inComentarios" + id).show();
            $("#Comentarios" + id).show();
            señal = true;
        } else {
            $("#Comentarios" + id).hide();
            señal = false;
        }

    });

    $("#cancComent" + id).click(function () {
        $("#inComentarios" + id).hide();
    });
}

//Da acciones el boton de crear un comentario 
function botoncrearComentario(id) {
    $("#eComent" + id).click(function () {
        coment = $("#inputcomentario" + id).val();
        if (coment == "") {
            swal("Error", "Por favor ingresa el comentario", "error");
        } else {
            if (crearComentario(id, coment)) {
                // swal("Muy bien", "Create un comentario", "success");
                newC = '<div class="card" style="width: 45rem;left:18%;">' +
                    '<div class="card-body"><b class="card-title">Comentario</b><p class="card-text">' + coment + '</p></div></div>';
                $("#Comentarios" + id).append(newC);
                $("#inputcomentario" + id).val("");
            } else {
                swal("Error", "El comentario no fue creado", "error");
            }
        }
    });
}

//Da acciones a el boton de borrar un todo
function botonBorrar(id) {
    $("#delete" + id).click( function () {
        swal({ title: "¿Estas seguro de borra el Todo?", icon: "warning", buttons: true, dangerMode: true, })
            .then( async (willDelete) => {
                if (willDelete) {
                    var result= await BorrarTodo(id);
                    if (result) {
                        $("#" + id).hide();
                    } else {
                        swal("El To-Do no se pudo borrar", { icon: "error", });
                    }
                }
            });
    });
}


