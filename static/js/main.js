var d = new Date();
fecha = (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
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
    if (contraseña == contraseña1 && correo.includes('@')) {
        envioCuenta(nombre, apellido, correo, contraseña);
    }else if (!correo.includes('@')) {
        swal("Error", "Correo incorrecto", "error");
    } else {
        //alerta incorrecta
        swal("Error", "Verificacion de contraseña incorrecto", "error");
    }
});

async function envioCuenta(nombre, apellido, correo, contraseña) {
    var envio= await crearCuenta(nombre, apellido, correo, contraseña)
    if (envio==1) {
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
    } else if (envio==0) {
        swal("Error", "Revisa si ingresaste los datos correctamente", "error");
    }else{
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
        //Invoca a metodo de peticion
        if (login(correo, contraseña)) {
            consultarTodo();
            mostrarPaginaPrincipal();
        } else {
            //Envio de alerta
            $("#alertaLogin").append('<div class="alert alert-danger" role="alert">Error, intentalo nuevamente</div>')
        }
    }

});


function mostrarPaginaPrincipal() {
    $('#fondo').hide();
    $("#wrapper").show();
}

$("#cerrarsesion").click(function () {

    $("#wrapper").hide(700);
    $('#fondo').show(700);
});

//Boton para habilitar el menu Hamburguesa
$('#menu_on').click(function () {
    $('body').toggleClass('visible_menu');
})

$("#botonCrearTodo").click(function () {
    $('#nuevot').hide(700);
    $("#crearT").show(700);
});

id = 0;
$("#Creartodo").click(function () {
    id += 1;
    titulo = $('#titulo').val();
    des = $('#Descripcion').val();
    Fecha = $('#fechalimite').val();
    if(enviarTODO(titulo, des, Fecha)){
        titulo = $('#titulo').val("");
        des = $('#Descripcion').val("");
        Fecha = $('#fechalimite').val("");
    }
    
});

function enviarTODO(titulo, des, Fecha) {
    if (titulo == "") {
        swal("Error", "Ingresas todos los datos", "error");
    } else {
        if (crearTodo(titulo, des, Fecha, true)) {

            $('#nuevot').show(700);
            $("#crearT").hide(700);
            pruebaComents = { "0": { "c": 'Comentario1' }, "1": { "c": 'Comentario2' }, "2": { "c": 'Comentario3' } };
            pintarTODO(id, titulo, Fecha, des, pruebaComents);
            return true

        } else {
            swal("Error", "Revisa si ingrsaste los datos correctamente", "error");
            return false
        }
    }
}

$("#cancelartodo").click(function () {
    $('#nuevot').show(700);
    $("#crearT").hide(700);
});


// Toda la parte de dear funciones a los botones de cada TODO
function pintarTODO(id, Titulo, Fecha, Descripcion, comentarios) {
    com = "";
    for (var i in comentarios) {
        com += '<div class="card" style="width: 45rem;left:18%;">' +
            '<div class="card-body"><b class="card-title">Comentario <div id="deleteComent"'+id+' class="material-icons float-right">delete</div>  </b><p class="card-text">' + comentarios[i].c + '</p></div></div>';
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
    checkbox(id);
    abrirCancelarComment(id);
    botonBorrar(id);
    botoncrearComentario(id);
}

function checkbox(id) {
    $("#customCheck" + id).click(function () {
        accionesCheck(id);
    });
}


function accionesCheck(id) {
    if ($("#customCheck" + id).is(':checked')) {
        if (actualizarTodo(id, true)) {
            $("#titulo" + id).addClass("tachado");
            $("#Fecha" + id).addClass("tachado");
            $("#des" + id).addClass("tachado");
            $("#" + id).addClass("animate__animated animate__heartBeat");
        } else {
            $("#customCheck" + id).prop("checked", false);
            swal("Error", "No se pudo actualizar a realizado", "error");
        }
    } else {
        if (actualizarTodo(id, false)) {
            $("#titulo" + id).removeClass("tachado");
            $("#Fecha" + id).removeClass("tachado");
            $("#des" + id).removeClass("tachado");
        } else {
            $("#customCheck" + id).prop("checked", true);
            swal("Error", "No se pudo actualizar a no realizado", "error");
        }
    }
}




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


function botonBorrar(id) {
    $("#delete" + id).click(function () {
        swal({ title: "¿Estas seguro de borra el Todo?", icon: "warning", buttons: true, dangerMode: true, })
            .then((willDelete) => {
                if (willDelete) {
                    if (BorrarTodo(id)) {
                        swal("To-Do borrado correctamente", { icon: "success", });
                        $("#" + id).hide();
                    } else {
                        swal("El To-Do no se pudo borrar", { icon: "error", });
                    }
                }
            });
    });
}


