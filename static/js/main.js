var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
$( "#Cuenta" ).click(function() {
    // Animacion para mostrara el regiitro:
    $("#Registro").removeClass("animate__animated animate__backOutRight");
    $("#login").removeClass("animate__backInLeft");
    $("#login").addClass(" animate__backOutLeft");
    $("#Registro").addClass("animate__animated animate__backInRight");
     $('#Registro').show();
  });

  $( "#cancelarCuenta" ).click(function() {
    // Animacion para cancelar el registro:
    $("#Registro").removeClass("animate__animated animate__backInRight");
    $("#login").removeClass("animate__backOutLeft");
    $("#Registro").addClass("animate__animated animate__backOutRight");
    $("#login").addClass("animate__animated animate__backInLeft");
  });


  $( "#CrearCuenta" ).click(function() {
    // Animacion para cancelar el registro:
    $("#Registro").removeClass("animate__animated animate__backInRight");
    $("#login").removeClass("animate__backOutLeft");
    $("#Registro").addClass("animate__animated animate__backOutRight");
    $("#login").addClass("animate__animated animate__backInLeft");

  });