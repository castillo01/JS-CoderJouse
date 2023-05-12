let contenedor = document.querySelector("#contenedor");
let principal = document.querySelector("#principal");
const imageSimulador = document.querySelector("#imageSimulado");
const nombreSimulador = document.querySelector("#nombreSimulado");
const interesSimulador = document.querySelector("#interesSimulado");
const cuotasSimulador = document.querySelector("#cuotasSimulado");
const limiteSimulador = document.querySelector("#limiteSimulado");
const minimoSimulador = document.querySelector("#minimoSimulado");
const simulador = document.querySelector("#simulador");
const inputNumero = document.querySelector("#inputNumero");
const buttonSimular = document.querySelector("#button-simular");
const URL = `js/array.json`;
const creditos = [];

fetch(URL)
  .then((respuesta) => respuesta.json())
  .then((data) => creditos.push(...data))
  .then(() => recorrerArray(creditos));

function generarHTML(resultado) {
  return `<div class="card" id="card">
    <h3 id="nombreElemento">${resultado.nombre}</h3>
    <img id="imagen" class="iconoCredito" src=${resultado.imagen} alt="">
    <span>Interes: <trong id="interes">${resultado.interes}</strong></span>
    <span >Cuotas disponibles: <strong id="cuotas">${resultado.cuotas}</strong></span>
    <span >Limite de credito:<strong id="limiteCredito">${resultado.limite}</strong></span>
    <span>Minimo de credito:<strong id="minimoCredito">${resultado.minimo}</strong></span>
    <a href="#simulador"><button class="button-add">Ir</button></a>
    </div>`;
}

function agregarHTML(array) {
  contenedor.innerHTML += generarHTML(array);
}

function recorrerArray(parametro) {
  creditos.forEach((credito) => {
    agregarHTML(credito);
    eventoClickConBotones();
  });
}

recorrerArray();
const cardsCreditos = document.querySelectorAll(".card");

function eventoClickConBotones() {
  const buttons = document.querySelectorAll(".button-add");
  let resultado = buttons.forEach((botones) => {
    botones.addEventListener("click", (e) => {
      let card = e.target.closest(".card");
      let imagenCard = card.querySelector("#imagen");
      let urlImagenCard = imagenCard.src;
      let nombreCard = card.querySelector("#nombreElemento").textContent;
      let interesCard = card.querySelector("#interes").textContent;
      let cuotaCard = card.querySelector("#cuotas").textContent;
      let limiteCard = card.querySelector("#limiteCredito").textContent;
      let minimoCard = card.querySelector("#minimoCredito").textContent;

      const cardSimulada = {
        imagen: urlImagenCard,
        nombre: nombreCard,
        interes: interesCard,
        cuota: cuotaCard,
        limite: limiteCard,
        minimo: minimoCard,
      };
      agarrarDatosCard(
        cardSimulada.imagen,
        cardSimulada.nombre,
        cardSimulada.interes,
        cardSimulada.cuota,
        cardSimulada.limite,
        cardSimulada.minimo
      );
    });
  });
}

function agarrarDatosCard(imagen, nombre, interes, cuota, limite, minimo) {
  imageSimulador.innerHTML = `<img class="imageSimulador" src="${imagen}" alt="">`;
  nombreSimulador.textContent = "Nombre de crédito: ";
  interesSimulador.textContent = "Interes del crédito: ";
  cuotasSimulador.textContent = "Cuotas del crédito: " + cuota;
  limiteSimulador.innerHTML = `<span>Limite de crédito: <strong id="valorLimite">${limite}</strong></span>`;
  minimoSimulador.innerHTML = `<span>Minimo del credito: <strong id="valorMinimo">${minimo}</strong></span>`;
  nombreSimulador.innerHTML += `<strong id="valorNombre">${nombre}</strong>`;
  interesSimulador.innerHTML += `<strong id="valorInteres">${interes}</strong>`;
  buttonSimular.innerHTML = `<button id="botonSimular">Calcular</button>`;
}

function calcularCredito() {
  let valorNombre = document.querySelector("#valorNombre");
  let valorInteres = document.querySelector("#valorInteres");
  let valorMinimo = document.querySelector("#valorMinimo");
  let valorLimite = document.querySelector("#valorLimite");
  let valorNombrePrueba = valorNombre.textContent;
  let valorInteresCalculo = parseInt(valorInteres.textContent);
  let valorMinimoPrueba = parseInt(valorMinimo.textContent);
  let valorLimitePrueba = parseInt(valorLimite.textContent);
  let valorInput = parseInt(inputNumero.value);
  const spanCotizar = document.querySelector("#spanCotizar");

  let calcularA = (valorInput * valorInteresCalculo) / 100;
  let sumar = calcularA + valorInput;
  let resultado = sumar;

  const datosCredito = {
    nombre: valorNombrePrueba,
    valorIngresado: valorInput,
    totalSimulado: resultado,
  };

  valorInput > valorLimitePrueba || valorInput <= valorMinimoPrueba
    ? Swal.fire(
        "Simulador de crédito Alianza BA",
        "Hubo un error en los valores ingresados",
        "warning"
      )
    : (spanCotizar.innerHTML = `<img class="iconoCarga" src="../img/gif-coder.gif"></img>`);
  setTimeout(() => {
    spanCotizar.innerHTML = `Listo!`;
    simulador.innerHTML += `<span>Total: <strong>${resultado}</strong></span>`;
    simulador.innerHTML += `<button class="botonGuardado" id="guardarDatos"><img class="iconoGuardado" src="../img/guardar-datos.png"></img></button>`;
    simulador.innerHTML += `<button id="botonAdquirir">Adquirir crédito</button>`;
    adquirirCredito();
    guardarDatosLS(
      datosCredito.nombre,
      datosCredito.valorIngresado,
      datosCredito.totalSimulado
    );
  }, 3000);
}

eventoClickConBotones();

function eventoSimular() {
  buttonSimular.addEventListener("click", calcularCredito);
}

eventoSimular();

function guardarDatosLS(nombre, valorInput, totalSimulado) {
  let guardadoDatos = document.querySelector("#guardarDatos");
  guardadoDatos.addEventListener("click", () => {
    let datosSalvados = {
      nombre: nombre,
      valorInput: valorInput,
      totalSimulado: totalSimulado,
    };
    localStorage.setItem("Ultimo Crédito", JSON.stringify(datosSalvados));
  });
}

function adquirirCredito() {
  const botonAdquirir = document.querySelector("#botonAdquirir");

  botonAdquirir.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Deseas adquirir el crédito?",
        text: "Puedes avanzar, o buscar otro crédito si lo deseas",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Adquirir crédito",
        cancelButtonText: "Cancelar adquisión",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Genial!",
            "Haz adquirido tu crédito.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Operación cancelada!",
            "Podrás elegir otro crédito si lo deseas...",
            "error"
          );
        }
      });
  });
}
