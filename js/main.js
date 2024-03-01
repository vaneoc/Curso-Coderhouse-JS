//Función para obtener la información del paciente desde el formulario
function obtenerInformacionPaciente() {
    let nombre = document.getElementById("nombre-nino").value;
    let edadPaciente = document.getElementById("edad-nino").value;
    return { nombre, edadPaciente }; // Retorna un objeto con el nombre y edad del paciente
}

// Función para procesar la información del paciente y realizar la reserva
function procesarInformacion({ edadPaciente, nombre }) {
    let nombreCuidador = document.getElementById("nombre-cuidador").value; // Obtiene el nombre del cuidador

    if (edadPaciente >= 18) {
        alert("Lo sentimos, no puedes tomar horas de rehabilitación si el paciente tiene 18 años o más.");
        return false;
    }

    const especialidadSeleccionada = document.getElementById("especialidad").value;
    if (!especialidadSeleccionada) {
        alert('No has seleccionado ninguna especialidad.');
        return false;
    }

    while (true) {
        // Si no se seleccionó otra hora, se procede a seleccionar la primera disponible
        const horaSeleccionada = seleccionarHora(especialidadSeleccionada);
        if (!horaSeleccionada) {
            alert('No has seleccionado ninguna hora.');
            return false;
        }

        const confirmacion = confirmarReserva(horaSeleccionada, especialidadSeleccionada);
        if (confirmacion) {
            const email = document.getElementById("email").value;
            alert(`Gracias por tu reserva, ${nombreCuidador}. Te enviaremos la información de la cita para ${nombre} a ${email}.`);
            alert("¡Gracias por utilizar nuestro servicio de reserva de citas!");
            return true;
        } else {
            const continuar = confirm('¿Deseas volver a las opciones de hora?');
            if (!continuar) {
                alert("¡Gracias por utilizar nuestro servicio de reserva de citas!");
                return false;
            }
        }
    }
}

// Función para seleccionar una hora disponible según la especialidad
function seleccionarHora(especialidadSeleccionada) {
    const horasDisponibles = [9, 10, 11, 14, 15, 16];
    alert(`Has seleccionado ${especialidadSeleccionada}`);
    for (let j = 0; j < horasDisponibles.length; j++) {
        const hora = horasDisponibles[j];
        let respuesta;
        do {
            respuesta = prompt(`La siguiente hora disponible para ${especialidadSeleccionada} es a las ${hora} horas, ¿Deseas reservar esta hora? (ingrese "si" para confirmar o "no" para omitir)`);
            respuesta = respuesta ? respuesta.trim().toLowerCase() : ''; // Convierte la respuesta a minúsculas y elimina espacios en blanco
            if (respuesta !== 'si' && respuesta !== 'no') {
                alert('Por favor, ingrese "si" para confirmar o "no" para omitir.');
            }
        } while (respuesta !== 'si' && respuesta !== 'no');
        if (respuesta === 'si') {
            return hora;
        }
    }
    return null;
}

// Función para validar la respuesta de confirmación
function validarRespuestaConfirmar(respuesta) {
    return respuesta && (respuesta.toLowerCase() === 'si' || respuesta.toLowerCase() === 'no');
}

// Función para confirmar la reserva
function confirmarReserva(horaSeleccionada, especialidadSeleccionada) {
    let respuesta;
    do {
        respuesta = prompt(`Has reservado tu cita a las ${horaSeleccionada} horas para ${especialidadSeleccionada} ¿deseas continuar? (ingrese "si" para confirmar, "no" para volver a las opciones de horas disponibles)`);
        respuesta = respuesta ? respuesta.trim().toLowerCase() : ''; // Convierte la respuesta a minúsculas y elimina espacios en blanco
        if (!validarRespuestaConfirmar(respuesta)) {
            alert('Por favor, ingrese "si" para confirmar o "no" para volver a las opciones de horas disponibles.');
        }
    } while (!validarRespuestaConfirmar(respuesta));

    // Realiza la acción según la respuesta del usuario
    return respuesta === 'si';
}
