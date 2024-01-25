function obtenerInformacionPaciente() {
    let nombre = prompt("Ingresa nombre del paciente:");
    let edadPaciente = prompt("Ingresa la edad del paciente:");
    return { nombre, edadPaciente };
  }
  
  function procesarInformacion({ edadPaciente, nombre }) {
    if (edadPaciente >= 18) {
        alert("Lo sentimos, no puedes tomar horas de rehabilitación si el paciente tiene 18 años o más.");
        return null; 
    }
  
    const especialidadSeleccionada = seleccionarEspecialidad(nombre);
    if (!especialidadSeleccionada) {
        alert('No has seleccionado ninguna especialidad.');
        return null; 
    }
  
    const horaSeleccionada = seleccionarHora(especialidadSeleccionada);
    if (!horaSeleccionada) {
        alert('No has seleccionado ninguna hora.');
        return null; 
    }
  
    const confirmacion = confirmarReserva(horaSeleccionada, especialidadSeleccionada);
    if (confirmacion) {
        const email = prompt("Ingresa tu correo electrónico:");
        alert(`Gracias por tu reserva, ${nombre}. Te enviaremos la información de tu cita a ${email}.`);
    }
  }
  
  function seleccionarEspecialidad(nombre) {
    const especialidades = ["kinesiología", "fonoaudiología", "terapia ocupacional"];
    alert(`Hola ${nombre}, selecciona la especialidad que deseas reservar:`);
    for (let i = 0; i < especialidades.length; i++) {
        const especialidad = especialidades[i];
        const respuesta = prompt(`${i + 1}. ${especialidad} (ingrese "si" para seleccionar o "no" para omitir)`);
        if (respuesta.toLowerCase() === 'si') {
            return especialidad;
        }
    }
    return null;
  }
  
  function seleccionarHora(especialidadSeleccionada) {
    const horasDisponibles = [9, 10, 11, 14, 15, 16];
    alert(`Has seleccionado ${especialidadSeleccionada}`);
    for (let j = 0; j < horasDisponibles.length; j++) {
        const hora = horasDisponibles[j];
        const respuesta = prompt(`La siguiente hora disponible para ${especialidadSeleccionada} es a las ${hora} horas, ¿Deseas reservar esta hora? (ingrese "si" para confirmar o "no" para omitir)`);
        if (respuesta.toLowerCase() === 'si') {
            return hora;
        }
    }
    return null;
  }
  
  function confirmarReserva(horaSeleccionada, especialidadSeleccionada) {
    return confirm(`Has reservado tu cita a las ${horaSeleccionada} horas para ${especialidadSeleccionada} ¿deseas continuar?`);
  }
  
  const { nombre, edadPaciente } = obtenerInformacionPaciente();
  procesarInformacion({ edadPaciente, nombre });
  