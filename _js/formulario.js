// 🎯 SISTEMA DE VALIDACIÓN AVANZADA

console.log('✅ El archivo JS está conectado correctamente');

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioAvanzado');
  const campos = formulario.querySelectorAll('input, textarea, select');
  const btnEnviar = document.getElementById('btnEnviar');

  let estadoValidacion = {};
  campos.forEach((campo) => {
    estadoValidacion[campo.name] = false;
  });

  // Funciones auxiliares
  function mostrarError(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      elemento.textContent = mensaje;
      elemento.style.display = 'block';
    }
    ocultarMensaje(idElemento.replace('error', 'exito'));
  }

  function mostrarExito(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      elemento.textContent = mensaje;
      elemento.style.display = 'block';
    }
    ocultarMensaje(idElemento.replace('exito', 'error'));
  }

  function ocultarMensaje(idElemento) {
    const elemento = document.getElementById(idElemento);
    if (elemento) elemento.style.display = 'none';
  }

  function marcarCampo(campo, esValido) {
    estadoValidacion[campo.name] = esValido;
    campo.classList.toggle('valido', esValido);
    campo.classList.toggle('invalido', !esValido);
    actualizarProgreso();
    actualizarBotonEnvio();
  }

  function calcularFortalezaPassword(password) {
    let puntos = 0;
    if (password.length >= 8) puntos++;
    if (password.length >= 12) puntos++;
    if (/[a-z]/.test(password)) puntos++;
    if (/[A-Z]/.test(password)) puntos++;
    if (/[0-9]/.test(password)) puntos++;
    if (/[^A-Za-z0-9]/.test(password)) puntos++;
    const niveles = ['muy débil', 'débil', 'media', 'fuerte', 'muy fuerte'];
    const nivel = Math.min(Math.floor(puntos / 1.2), 4);
    return { nivel, texto: niveles[nivel], puntos };
  }

  function actualizarBarraFortaleza(fortaleza) {
    const barra = document.getElementById('strengthBar');
    if (!barra) return;
    const clases = ['strength-weak', 'strength-weak', 'strength-medium', 'strength-strong', 'strength-very-strong'];
    barra.className = 'password-strength ' + clases[fortaleza.nivel];
  }

  function actualizarProgreso() {
    const totalCampos = Object.keys(estadoValidacion).length;
    const camposValidos = Object.values(estadoValidacion).filter((valido) => valido).length;
    const porcentaje = Math.round((camposValidos / totalCampos) * 100);
    const barraProgreso = document.getElementById('barraProgreso');
    const porcentajeProgreso = document.getElementById('porcentajeProgreso');
    if (barraProgreso) barraProgreso.style.width = porcentaje + '%';
    if (porcentajeProgreso) porcentajeProgreso.textContent = porcentaje + '%';
  }

  function actualizarBotonEnvio() {
    const todosValidos = Object.values(estadoValidacion).every((valido) => valido);
    btnEnviar.disabled = !todosValidos;
  }

  function obtenerNombreCampo(campo) {
    const nombres = {
      nombreCompleto: 'Nombre completo',
      correo: 'Correo electrónico',
      password: 'Contraseña',
      confirmarPassword: 'Confirmación de contraseña',
      telefono: 'Teléfono',
      fechaNacimiento: 'Fecha de nacimiento',
      comentarios: 'Comentarios',
      terminos: 'Términos aceptados'
    };
    return nombres[campo] || campo;
  }

  // Validaciones específicas por campo

  // Nombre completo
  const inputNombre = document.getElementById('nombreCompleto');
  inputNombre.addEventListener('input', function () {
    const valor = this.value.trim();
    const nombres = valor.split(' ').filter(nombre => nombre.length > 0);
    if (valor.length < 3) {
      mostrarError('errorNombre', 'El nombre debe tener al menos 3 caracteres');
      marcarCampo(this, false);
    } else if (nombres.length < 2) {
      mostrarError('errorNombre', 'Ingresa al menos 2 nombres');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoNombre', '✓ Nombre válido');
      marcarCampo(this, true);
    }
  });

  // Correo
  const inputCorreo = document.getElementById('correo');
  inputCorreo.addEventListener('input', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      mostrarError('errorCorreo', 'Formato de email inválido');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoCorreo', '✓ Email válido');
      marcarCampo(this, true);
    }
  });

  // Contraseña
  const inputPassword = document.getElementById('password');
  inputPassword.addEventListener('input', function () {
    const password = this.value;
    const fortaleza = calcularFortalezaPassword(password);
    actualizarBarraFortaleza(fortaleza);

    if (password.length < 8) {
      mostrarError('errorPassword', 'La contraseña debe tener al menos 8 caracteres');
      marcarCampo(this, false);
    } else if (fortaleza.nivel < 2) {
      mostrarError('errorPassword', 'Contraseña muy débil. Añade números y símbolos');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoPassword', `✓ Contraseña ${fortaleza.texto}`);
      marcarCampo(this, true);
    }

    const confirmar = document.getElementById('confirmarPassword');
    if (confirmar.value) confirmar.dispatchEvent(new Event('input'));
  });

  // Confirmar contraseña
  const inputConfirmar = document.getElementById('confirmarPassword');
  inputConfirmar.addEventListener('input', function () {
    const password = document.getElementById('password').value;
    if (this.value !== password) {
      mostrarError('errorConfirmar', 'Las contraseñas no coinciden');
      marcarCampo(this, false);
    } else if (this.value.length > 0) {
      mostrarExito('exitoConfirmar', '✓ Contraseñas coinciden');
      marcarCampo(this, true);
    }
  });

  // Teléfono
  const inputTelefono = document.getElementById('telefono');
  inputTelefono.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 6) {
      valor = valor.substring(0, 3) + '-' + valor.substring(3, 6) + '-' + valor.substring(6, 10);
    } else if (valor.length > 3) {
      valor = valor.substring(0, 3) + '-' + valor.substring(3);
    }
    this.value = valor;

    const telefonoRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!telefonoRegex.test(valor)) {
      mostrarError('errorTelefono', 'Formato: 300-123-4567');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoTelefono', '✓ Teléfono válido');
      marcarCampo(this, true);
    }
  });

  // Fecha de nacimiento
  const inputFecha = document.getElementById('fechaNacimiento');
  inputFecha.addEventListener('change', function () {
    const fechaNacimiento = new Date(this.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    if (edad < 18) {
      mostrarError('errorFecha', 'Debes ser mayor de 18 años');
      marcarCampo(this, false);
    } else if (edad > 100 || isNaN(edad)) {
      mostrarError('errorFecha', 'Fecha no válida');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoFecha', `✓ Edad: ${edad} años`);
      marcarCampo(this, true);
    }
  });

  // Comentarios (contador y sin validación estricta)
  const inputComentarios = document.getElementById('comentarios');
  inputComentarios.addEventListener('input', function () {
    const contador = document.getElementById('contadorComentarios');
    if (contador) {
      contador.textContent = this.value.length;
      if (this.value.length > 450) {
        contador.style.color = '#dc3545';
      } else if (this.value.length > 400) {
        contador.style.color = '#ffc107';
      } else {
        contador.style.color = '#666';
      }
    }
    marcarCampo(this, true);
  });

  // Términos y condiciones
  const inputTerminos = document.getElementById('terminos');
  inputTerminos.addEventListener('change', function () {
    if (!this.checked) {
      mostrarError('errorTerminos', 'Debes aceptar los términos y condiciones');
      marcarCampo(this, false);
    } else {
      ocultarMensaje('errorTerminos');
      marcarCampo(this, true);
    }
  });

  // Evento submit del formulario
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const datosFormulario = new FormData(this);
    let resumenHTML = '';
    for (let [campo, valor] of datosFormulario.entries()) {
      if (valor && valor.trim() !== '') {
        const nombreCampo = obtenerNombreCampo(campo);
        resumenHTML += `<div class="dato-resumen"><span class="etiqueta-resumen">${nombreCampo}:</span> ${valor}</div>`;
      }
    }
    document.getElementById('contenidoResumen').innerHTML = resumenHTML;
    document.getElementById('resumenDatos').style.display = 'block';
    document.getElementById('resumenDatos').scrollIntoView({ behavior: 'smooth' });
    console.log('📊 Formulario enviado con validación completa:', Object.fromEntries(datosFormulario));
  });

  // Inicializar estado
  actualizarProgreso();
  actualizarBotonEnvio();

  // Función para reiniciar el formulario (puedes llamarla desde un botón si quieres)
  window.reiniciarFormulario = function () {
    formulario.reset();
    document.getElementById('resumenDatos').style.display = 'none';
    Object.keys(estadoValidacion).forEach((campo) => estadoValidacion[campo] = false);
    campos.forEach((campo) => campo.classList.remove('valido', 'invalido'));
    document.querySelectorAll('.mensaje-error, .mensaje-exito').forEach((mensaje) => mensaje.style.display = 'none');
    actualizarProgreso();
    actualizarBotonEnvio();
    const barra = document.getElementById('strengthBar');
    if (barra) barra.className = 'password-strength';
  };

});
