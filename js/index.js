let contenedor = document.querySelector("#contenedor")
let principal = document.querySelector("#principal")
let cardsCreditos = document.querySelectorAll(".card")



function generarHTML(resultado) {
    return `<div class="card" id="card">
    <h3 id="nombreElemento">${resultado.nombre}</h3>
    <img id="imagen" class="iconoCredito" src=${resultado.imagen} alt="">
    <span>Interes: <trong id="interes">${resultado.interes}</strong></span>
    <span >Cuotas disponibles: <strong id="cuotas">${resultado.cuotas}</strong></span>
    <input type="text" name="" class="inputCotizar">
    <button class="button-add">Simular</button>
    </div>`
}

function agregarHTML(array) {


    contenedor.innerHTML += generarHTML(array)
}

function recorrerArray() {
    
    
    let resultado = creditos.forEach((credito) => {
        agregarHTML(credito)
        eventoClickConBotones()

    })
}

function generarError() {
    principal.innerHTML += retornarmensajeError()
}


function eventoClickConBotones() {
    
    let buttons = document.querySelectorAll(".button-add")
 

    let resultado = buttons.forEach((botones)=>{

        botones.addEventListener("click", ()=> {


            const cardEspecifica = botones.closest(".card")

            const inputs = document.querySelectorAll(`.inputCotizar`).innerHTML
            const nombre = cardEspecifica.querySelector("#nombreElemento").innerHTML
            const interes = cardEspecifica.querySelector("#interes").innerHTML
            const cuotas = cardEspecifica.querySelector("#cuotas").innerHTML

            guardarDatosEnLS(nombre, interes, cuotas)
        })
    
})
}

function guardarDatosEnLS(nombre, interes, cuotas) {
    localStorage.setItem("Nombre", nombre)
    localStorage.setItem("Interes", interes)
    localStorage.setItem("Cuotas", cuotas)
    // localStorage.setItem("Simulacion", creditos.nombre)
}

function calcularCredito (numA, numB, inputCliente) {
    let calcularCredito = inputCliente * numA

    parseInt(console.log(calcularCredito))
}


recorrerArray()
eventoClickConBotones()














