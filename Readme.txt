<script>
      // 🎯 SIMULACIÓN DEL ENVÍO DEL FORMULARIO

      // Esperar a que el formulario sea enviado
      document
        .getElementById('miFormulario')
        .addEventListener('submit', function (evento) {
          // 1. Prevenir que la página se recargue (comportamiento por defecto)
          evento.preventDefault();

          // 2. Capturar todos los datos del formulario
          const formulario = evento.target;
          const datosFormulario = new FormData(formulario);

          // 3. Mostrar los datos en la consola (para estudiantes avanzados)
          console.log('📊 Datos del formulario:');
          for (let [campo, valor] of datosFormulario.entries()) {
            console.log(`${campo}: ${valor}`);
          }

          // 4. Convertir los datos a un formato legible
          let datosHTML = '';

          // Recorrer cada campo y crear HTML para mostrar
          for (let [campo, valor] of datosFormulario.entries()) {
            // Hacer más legibles los nombres de los campos
            let nombreCampo = campo;
            switch (campo) {
              case 'nombre':
                nombreCampo = 'Nombre completo';
                break;
              case 'email':
                nombreCampo = 'Correo electrónico';
                break;
              case 'edad':
                nombreCampo = 'Edad';
                break;
              case 'ciudad':
                nombreCampo = 'Ciudad';
                break;
              case 'experiencia':
                nombreCampo = 'Experiencia en programación';
                break;
              case 'acepto':
                nombreCampo = 'Términos aceptados';
                break;
              case 'comentarios':
                nombreCampo = 'Comentarios';
                break;
            }

            // Si el campo tiene valor, mostrarlo
            if (valor && valor.trim() !== '') {
              datosHTML += `
                        <div class="dato">
                            <span class="etiqueta">${nombreCampo}:</span> ${valor}
                        </div>
                    `;
            }
          }

          // 5. Mostrar los resultados en la página
          document.getElementById('datosEnviados').innerHTML = datosHTML;
          document.getElementById('resultado').style.display = 'block';

          // 6. Scroll suave hacia los resultados
          document.getElementById('resultado').scrollIntoView({
            behavior: 'smooth',
          });

          // 7. Mensaje de confirmación adicional
          alert(
            '¡Formulario enviado correctamente! 🎉\nRevisa los datos más abajo.'
          );
        });

      // 🎯 FUNCIONALIDAD EXTRA: Limpiar formulario
      function limpiarFormulario() {
        document.getElementById('miFormulario').reset();
        document.getElementById('resultado').style.display = 'none';
      }

      // Agregar botón de limpiar después del envío
      document.addEventListener('DOMContentLoaded', function () {
        const contenedor = document.querySelector('.container');
        const botonLimpiar = document.createElement('button');
        botonLimpiar.innerHTML = '🗑️ Limpiar Formulario';
        botonLimpiar.style.backgroundColor = '#ff9800';
        botonLimpiar.style.marginTop = '10px';
        botonLimpiar.onclick = limpiarFormulario;
        contenedor.appendChild(botonLimpiar);
      });
    </script>