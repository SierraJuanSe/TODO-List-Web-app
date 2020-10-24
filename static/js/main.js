var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
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
        //alerta correcta
        cor=crearCuenta(nombre,apellido,correo,contraseña);
        if (cor==true) {
        swal("Cuenta creada correctamente", "Estas listo para administrar tus tareas", "success")
            .then((value) => {
                // Animacion de creacion de usuario
                $("#Registro").removeClass("animate__animated animate__backInRight");
                $("#login").removeClass("animate__backOutLeft");
                $("#Registro").addClass("animate__animated animate__backOutRight");
                $("#login").addClass("animate__animated animate__backInLeft");
            });
        }else{
            swal("Error", "Revisa si ingrsaste los datos correctamente", "error");
        }
    } else {
        swal("Error", "Verificacion de contraseña incorrecto", "error");
    }
});