let eventos = [];
let arr = [];
const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const botnAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

const json = cargar();
    try {
        arr = JSON.parse(json);
    }catch (error) {
        arr = []
    }
eventos = arr? [...arr] : [];
mostrarEventos();

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    agregarEvento();
});

function agregarEvento() {
    if (nombreEvento.value === "" || fechaEvento.value === ""){
        return;
    }

    if (diferenciaFecha(fechaEvento.value) < 0){
        return;
    }
    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3),
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,
    };
    eventos.unshift(nuevoEvento);

    guardar(JSON.stringify(eventos));
    nombreEvento.value = "";
    mostrarEventos()
}

function diferenciaFecha(destino) {
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();
    let diferencia = fechaDestino.getTime() - fechaActual.getTime();
    let dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
}

function mostrarEventos() {
    const eventosHTML = eventos.map((eventos) =>{
        return`
        <div class="evento">
        <div class="dias">
        <span class="diasFaltantes">${diferenciaFecha(eventos.fecha)}</span>
        <span class="texto">Dias Para</span>
        </div>
        <div class="nombreEvento">${eventos.nombre}</div>
        <div class="fechaEvento">${eventos.fecha}</div>
        <div class="acciones">
          <button data-id="${eventos.id}" class="eliminar">Eliminar</button>
          </div>
        </div>
       `;
    });
    listaEventos.innerHTML=eventosHTML.join("");
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener("click",e => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);
            guardar(JSON.stringify(eventos));
            mostrarEventos();
        });
    });
}
function guardar(datos){
    localStorage.setItem("lista",datos);
}
function cargar(){
    return localStorage.getItem("lista");
}