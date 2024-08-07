const API_URL = 'http://localhost:3000/scores';

// Función para guardar el puntaje
async function guardarPuntaje(tiempo, puntos, nombre) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tiempo, puntos, nombre })
    });
    if (response.ok) {
        console.log('Puntaje guardado correctamente');
    } else {
        console.error('Error al guardar el puntaje');
    }
}

// Función para obtener los puntajes
async function obtenerPuntajes() {
    const response = await fetch(API_URL);
    const puntajes = await response.json();
    mostrarPuntajes(puntajes);
}

// Función para mostrar los puntajes en el HTML
function mostrarPuntajes(puntajes) {
    const tabla = document.getElementById('tabla-puntajes');
    tabla.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Puntos</th>
            <th>Tiempo</th>
            <th>Fecha</th>
        </tr>
    `;
    puntajes.forEach(puntaje => {
        tabla.innerHTML += `
            <tr>
                <td>${puntaje.nombre}</td>
                <td>${puntaje.puntos}</td>
                <td>${puntaje.tiempo}</td>
                <td>${puntaje.fecha}</td>
            </tr>
        `;
    });
}

// Modificar la función compruebaFin para guardar el puntaje
function compruebaFin() {
    if (!oculta.includes("_")) {
        document.getElementById("msg-final").innerHTML = "Felicidades !!";
        document.getElementById("msg-final").classList.add("zoom-in");
        document.getElementById("palabra").classList.add("encuadre");
        for (let button of buttons) {
            button.disabled = true;
        }
        document.getElementById("reset").innerHTML = "Empezar";
        btnInicio.onclick = () => location.reload();

        const tiempo = 60 - cont; // Ejemplo de cálculo del tiempo
        const puntos = 100; // Ejemplo de puntos
        const nombre = prompt("Introduce tu nombre:");
        guardarPuntaje(tiempo, puntos, nombre);
        obtenerPuntajes();
    } else if (cont === 0) {
        document.getElementById("msg-final").innerHTML = "Game Over";
        document.getElementById("msg-final").classList.add("zoom-in");
        for (let button of buttons) {
            button.disabled = true;
        }
        document.getElementById("reset").innerHTML = "Empezar";
        btnInicio.onclick = () => location.reload();
    }
}

// Iniciar
window.onload = () => {
    fetchPalabra();
    obtenerPuntajes();
};
