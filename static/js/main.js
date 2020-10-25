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
    if (contraseña == contraseña1) {
        cor = crearCuenta(nombre, apellido, correo, contraseña);
        if (cor == true) {
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
        } else {
            swal("Error", "Revisa si ingrsaste los datos correctamente", "error");
        }
    } else {
        //alerta incorrecta
        swal("Error", "Verificacion de contraseña incorrecto", "error");
    }
});

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
            mostrarPaginaPrincipal();
        } else {
            //Envio de alerta
            $("#alertaLogin").append('<div class="alert alert-danger" role="alert">Error, intentalo nuevamente</div>')
        }
    }

});

$("#cerrarsesion").click(function () {
    $("#fondo").removeClass("animate__animated animate__backOutLeft");
    $("#wrapper").removeClass("animate__animated animate__backInRight");
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

$("#Creartodo").click(function () {
    $('#nuevot').
        titulo = $('#titulo').val();
    des = $('#Descripcion').val();
    Fecha = $('#fechalimite').val();
    if (titulo == "" || des == "") {
        swal("Error", "Ingresas todos los datos", "error");
    } else {
        if (crearTodo(titulo, des, Fecha, true)) {
            swal("Excelente", "Creaste un To-Do correctamente", "success")
                .then((value) => {
                    $('#nuevot').show(700);
                    $("#crearT").hide(700);
                });

        } else {
            swal("Error", "Revisa si ingrsaste los datos correctamente", "error");
        }
    }
});

$("#cancelartodo").click(function () {
    $('#nuevot').show(700);
    $("#crearT").hide(700);
});


function mostrarPaginaPrincipal() {
    $('#fondo').hide(700);
    $("#fondo").addClass("animate__animated animate__backOutLeft");
    $("#wrapper").addClass("animate__animated animate__backInRight");
    $("#wrapper").show();
}