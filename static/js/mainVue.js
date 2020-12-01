// Se crea el objeto de Vue para el modal
inTeam = false;
var modalE = new Vue({
  el: '#modalCrearE',
  data: {
    // datos del objeto
    estadoerror: false,
    error: null,
    equipo: [],
    toggle: 0,
    codigoEquipo: "Ax98HEas@l?.7k"
  },
  methods: {
    //MEtodo para validar los inputs y enviar a funciones de peticiones
    validarInput: async function () {
      if (this.toggle == 1) {
        enviarEquipo(this.nomE, this.desE);
      } else if (this.toggle == 2) {
        enviarUnion(this.codE);
      }
    },
    //Cierra el modal 
    copiarCodigo: function () {
      $('#CrearGrupo').modal('hide');
      modalE.toggle = 0;
    }
  }
})

//Envia los datos a las peticione sy regresa alertas
async function enviarEquipo(nombre, desc) {
  if (nombre && desc) {
    var result = await crearEquipo(nombre, desc);
    if (result) {
      modalE.estadoerror = false;
      modalE.toggle = 3;
      var equi = {
        "id": "1234",
        "nombre": nombre,
        "descripcion": desc
      }
      Menu.equipo.push(equi);
      modalE.nomE = "";
      modalE.desE = "";
    } else {
      modalE.error = "Error, Revise los datos o intentelo nuevamente";
      modalE.estadoerror = true;
    }

  } else {
    modalE.error = "Por favor digite todos los datos";
    modalE.estadoerror = true;
  }
}

//Envia los datos de un equipo a las peticiones sy regresa alertas
async function enviarUnion(codigo) {
  if (codigo) {
    var result = await UnirEquipo(codigo);
    if (result) {
      modalE.estadoerror = false;
      swal("Muy bien", "Te acabas de unir a un equipo de trabajo", "success");
      $('#CrearGrupo').modal('hide');
      modalE.codE = "";
      modalE.toggle = 0;
    } else {
      modalE.error = "Error, Revise los datos o intentelo nuevamente";
      modalE.estadoerror = true;
    }
  } else {
    modalE.error = "Por favor digite el codigo";
    modalE.estadoerror = true;
  }
}

//Objeto que contiene los equipos de trabajo de un usuario
var Menu = new Vue({
  el: '#Menu',
  data: {
    // datos del objeto
    equipo: [{ "id": "4234", "nombre": "Todo-List", "descripcion": "Es un proyecto que funciona para que organices tus tareas" },
    { "id": "411222", "nombre": "Python-Covid", "descripcion": "Es un proyecto que funciona para ver estadisticas del covid" }],
    seen: false,
    idEquipoSel: 0
  }, methods: {
    MostrarEquipo: async function (Titulo, id) {
      inTeam = true;
      this.idEquipoSel=id;
      if (Titulo == "Mis To-Do") {
        MenuEquipo.view = false;
        tittle.titulo = Titulo;
        inTeam=false;
        consultarTodo();
      } else {
        var consultaEquipos = await consultarInfoEquipos(id);
        if (consultaEquipos) {
          tittle.titulo = Titulo;
          MenuEquipo.view = true;
        } else {
          swal("Error", "Itentalo nuevamente mas tarde", "error");
        }
      }
    }
  }

});

// Objeto para mostrara y ocultar los todos
var TodosPintados = new Vue({
  el: '.LTodos',
  data: {
    misT: true,
    crearT: false
  }
});

//objeto que guarda los integrantes de un quipo y los oculta
var MenuEquipo = new Vue({
  el: "#MenuEquipo",
  data: {
    pos: false,
    view: false,
    personas: [{ "nombre": "Juan", "apellido": "Sierra", "correo": "Juan@hptmail.com" },
    { "nombre": "Felipe", "apellido": "Velasquez", "correo": "Juan*@hptmail.com" },
    { "nombre": "Camilo", "apellido": "AAAA", "correo": "Juan123@hptmail.com" }]
  }, methods: {
    cambiarEstado: function (estado) {
      this.pos = estado;
      //  if(estado){
      //   TodosPintados.misT=false;
      //  }else{
      //   TodosPintados.misT=true;

      //  }

      //  console.log(TodosPintados.misT+"  "+this.pos)

    }
  }
});


//Modifica el titulo de la pagina principal
var tittle = new Vue({
  el: '#tittle',
  data: {
    // datos del objeto
    titulo: "Mis To-Do"
  }
});




