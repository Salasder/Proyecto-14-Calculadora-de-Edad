// Comprobar que las librerías estén cargadas

if (typeof flatpickr === "undefined") {
    alert("Error: Flatpickr no se ha cargado.");
}

if (typeof luxon === "undefined") {
    alert("Error: Luxon no se ha cargado.");
}

// Seleccionar elementos HTML

const campoNacimiento = document.querySelector("#nacimiento");
const botonCalcular = document.querySelector("#boton-calcular");
const mensaje = document.querySelector("#mensaje");
const edadCalculada = document.querySelector("#edad-calculada");

// Inicializar calendario

const calendario = flatpickr(campoNacimiento, {

    locale: "es",

    dateFormat: "Y-m-d",

    altInput: true,

    altFormat: "d/m/Y",

    maxDate: "today",

    allowInput: false,

    disableMobile: true

});

// Calcular edad

botonCalcular.addEventListener("click", () => {

    mensaje.textContent = "";
    edadCalculada.textContent = "";

    const fechaSeleccionada = calendario.selectedDates[0];

    if (!fechaSeleccionada) {
        mensaje.textContent = "Selecciona una fecha de nacimiento.";
        return;
    }

    const nacimiento = luxon.DateTime
        .fromJSDate(fechaSeleccionada)
        .startOf("day");

    const hoy = luxon.DateTime.now().startOf("day");

    const edad = Math.floor(
        hoy.diff(nacimiento, "years").years
    );

    edadCalculada.textContent = `Tienes ${edad} años.`;

});