// Se crea el objeto de Vue para el modal
var modalE = new Vue({
  el: '#modalCrearE',
  data: {
    // datos del objeto
    estadoerror: false,
    error: null,
    equipo: [],
    toggle: 0,
    codigoEquipo:"Ax98HEas@l?.7k"
  },
  methods: {
    //MEtodo para validar los inputs y enviar a funciones de peticiones
    validarInput: async function () {
      if (this.toggle == 1) {
        enviarEquipo(this.nomE,this.desE);
      } else if(this.toggle == 2){
        enviarUnion(this.codE);
      }
    },
    //Cierra el modal 
    copiarCodigo:function(){
      $('#CrearGrupo').modal('hide'); 
      modalE.toggle = 0;
    }
  }
})

//Envia los datos a las peticione sy regresa alertas
async function enviarEquipo(nombre,desc){
  if (nombre && desc) {
    var result = await crearEquipo(nombre,desc);
    if(result){
      modalE.estadoerror=false;
      modalE.toggle = 3;
    }else{
      modalE.error = "Error, Revise los datos o intentelo nuevamente";
      modalE.estadoerror=true;
    }

  } else {
    modalE.error = "Por favor digite todos los datos";
    modalE.estadoerror=true;
  }
}

//Envia los datos de un equipo a las peticiones sy regresa alertas
async function enviarUnion(codigo){
  if (codigo) {
    var result = await UnirEquipo(codigo);
    if (result){
      modalE.estadoerror=false;
      swal("Muy bien", "Te acabas de unir a un equipo de trabajo", "success");
      $('#CrearGrupo').modal('hide'); 
      modalE.toggle = 0;
    }else{
      modalE.error = "Error, Revise los datos o intentelo nuevamente";
      modalE.estadoerror=true;
    }
  } else {
    modalE.error = "Por favor digite el codigo";
    modalE.estadoerror=true;
  }
}