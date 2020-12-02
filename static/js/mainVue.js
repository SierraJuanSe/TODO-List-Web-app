// Se crea el objeto de Vue para el modal
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
      modalE.codigoEquipo = result.code;
      Menu.equipo.push(result);
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
      Menu.equipo.push(result);
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
    equipo: [],
    seen: false,
    idEquipoSel: null,
    codEquiposel: null
  }, methods: {
    MostrarEquipo: async function (Titulo, id, cod) {

      console.log(this.idEquipoSel)
      if (Titulo == "Mis To-Do") {
        this.idEquipoSel = null;
        MenuEquipo.view = false;
        tittle.titulo = Titulo;
        consultarTodo();
      } else {
        this.codEquiposel = cod;
        this.idEquipoSel = id;
        tittle.titulo = Titulo;
        MenuEquipo.view = true;
        MenuEquipo.pos = false;
        MenuEquipo.personas = [];
        result = await consultarTodosEquipos(this.idEquipoSel);
        if (!result) {
          console.log("El Equipo no tiene ToDos")
        } else if (result == -1) {
          console.log("Error al consultar los Todos de un equipo")
        }
        // var consultaIntegrantes = await consultarIntegrantesEquipos(this.idEquipoSel);
        // if (consultaIntegrantes) {
        //   tittle.titulo = Titulo;
        //   MenuEquipo.view = true;
        // } else {
        //   swal("Error", "Itentalo nuevamente mas tarde", "error");
        // }
      }
    },
    mostrarEquipos: async function () {
      this.equipo = await consultarEquipos()
    }
  }

});

// Objeto para mostrara y ocultar los todos
var TodosPintados = new Vue({
  el: '#LTodos',
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
    personas: []
  }, methods: {
    cambiarEstado: async function (estado) {
      this.pos = estado;
      if (estado) {
        var consultaIntegrantes = await consultarIntegrantesEquipos(Menu.idEquipoSel);
        if (consultaIntegrantes) {
          this.personas = consultaIntegrantes;
        } else {
          swal("Error", "Itentalo nuevamente mas tarde", "error");
        }
      } else {
        console.log("Todod Del queipo")
      }

      //  if(estado){
      //   TodosPintados.misT=false;
      //  }else{
      //   TodosPintados.misT=true;

      //  }

      //  console.log(TodosPintados.misT+"  "+this.pos)

    },
    mostrarCod:function(){
      swal("Codigo: "+Menu.codEquiposel);
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




