/**
 * Quiz de Trivia - Cine Chileno
 * @author Cristian Ahumada
 * @version 2.0
 */

$(document).ready(function () {
    // Constantes
    const COLOR_CORRECTO = '#198754';
    const COLOR_INCORRECTO = '#dc3545';
    const TEXTO_CORRECTO = '¡Correcto!';
    const TEXTO_INCORRECTO = 'Incorrecto.';

    // Funciones de localStorage
    function guardarPuntaje(puntaje, total) {
        const historial = obtenerHistorial();
        const intento = {
            puntaje: puntaje,
            total: total,
            fecha: new Date().toISOString(),
            porcentaje: Math.round((puntaje / total) * 100),
        };
        historial.push(intento);
        localStorage.setItem('quizHistorial', JSON.stringify(historial));
    }

    function obtenerHistorial() {
        const historial = localStorage.getItem('quizHistorial');
        return historial ? JSON.parse(historial) : [];
    }

    function obtenerMejoresPuntajes() {
        const historial = obtenerHistorial();
        return historial.sort((a, b) => b.puntaje - a.puntaje || new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
    }

    function guardarPreferenciaTema(isDark) {
        localStorage.setItem('darkMode', isDark);
    }

    function cargarPreferenciaTema() {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            $('body').addClass('dark-mode');
            $('#quiz-app').addClass('dark-mode');
            $('#icon-theme').removeClass('bi-moon').addClass('bi-sun');
            $('#toggle-theme').removeClass('btn-outline-secondary').addClass('btn-warning');
        }
    }

    function formatearFecha(isoDate) {
        const fecha = new Date(isoDate);
        const opciones = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    }

    cargarPreferenciaTema();

    // Modo claro/oscuro
    $('#toggle-theme').on('click', function () {
        $('body').toggleClass('dark-mode');
        $('#quiz-app').toggleClass('dark-mode');
        const isDark = $('body').hasClass('dark-mode');
        $('#icon-theme').toggleClass('bi-moon', !isDark).toggleClass('bi-sun', isDark);
        $(this).toggleClass('btn-outline-secondary', !isDark).toggleClass('btn-warning', isDark);
        guardarPreferenciaTema(isDark);
    });

    // Preguntas del quiz
    const preguntas = [
        {
            pregunta: '¿Cuál es la película chilena ganadora del Óscar a Mejor Película Extranjera?',
            opciones: ['Machuca', 'Gloria', 'Una mujer fantástica', 'No'],
            respuesta: 2,
        },
        {
            pregunta: "¿Quién dirigió la película '<em>El Club</em>' (2015)?",
            opciones: ['Pablo Larraín', 'Sebastián Lelio', 'Andrés Wood', 'Patricio Guzmán'],
            respuesta: 0,
        },
        {
            pregunta: "¿En qué año se estrenó '<em>Machuca</em>'?",
            opciones: ['2000', '2004', '2008', '2012'],
            respuesta: 1,
        },
        {
            pregunta: '¿Cuál de estos actores NO es chileno?',
            opciones: ['Luis Gnecco', 'Alfredo Castro', 'Gael García Bernal', 'Antonia Zegers'],
            respuesta: 2,
        },
        {
            pregunta: '¿Qué película chilena trata sobre la dictadura y un plebiscito?',
            opciones: ['No', 'Tony Manero', 'La Nana', 'Violeta se fue a los cielos'],
            respuesta: 0,
        },
        {
            pregunta: "¿Quién dirigió la película chilena 'La nana', considerada un hito en el cine nacional?",
            opciones: ['Pablo Larraín', 'Sebastián Lelio', 'Andrés Wood', 'Sebastián Silva'],
            respuesta: 3,
        },
        {
            pregunta: "¿Quién protagonizó la película 'No' estrenada en 2012?",
            opciones: ['Luis Gnecco', 'Alfredo Castro', 'Gael García Bernal', 'Antonia Zegers'],
            respuesta: 2,
        },
        {
            pregunta: "¿Qué director chileno es conocido por la trilogía 'Tony Manero', 'Post Mortem' y 'No'?",
            opciones: ['Pablo Larraín', 'Sebastián Lelio', 'Andrés Wood', 'Patricio Guzmán'],
            respuesta: 0,
        },
        {
            pregunta: "La película 'El club' dirigida por Pablo Larraín aborda temas relacionados con:",
            opciones: ['La dictadura militar', 'Escándalos en la Iglesia Católica', 'La inmigración', 'El narcotráfco'],
            respuesta: 1,
        },
        {
            pregunta: 'El director Sebastián Lelio también dirigió cuál de estas películas:',
            opciones: ['No', 'El club', 'Gloria', 'Machuca'],
            respuesta: 2,
        },
        {
            pregunta: '¿Qué película chilena ganó la Concha de Oro en el Festival de San Sebastián 2001?',
            opciones: ['La Nana', 'Tony Manero', 'Taxi para tres', 'Turistas'],
            respuesta: 2,
        },
    ];

    // Variables de estado
    let preguntasAleatorias = [];
    let preguntaActual = 0;
    let puntaje = 0;
    let quizIniciado = false;

    // Mezcla preguntas aleatoriamente (Fisher-Yates)
    function mezclarPreguntas(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, 5);
    }

    function crearBarraProgreso(actual, total) {
        const porcentaje = Math.round((actual / total) * 100);
        return `
            <div class="progress mb-3" aria-label="Progreso del quiz" style="height: 24px;">
                <div class="progress-bar" role="progressbar" style="width: ${porcentaje}%;"
                     aria-valuenow="${actual}" aria-valuemin="1" aria-valuemax="${total}">${actual} / ${total}</div>
            </div>
        `;
    }

    function crearOpcionesHtml(opciones) {
        return opciones.map((op, idx) => `<button class="btn btn-answer btn-outline-primary" data-idx="${idx}" role="button" aria-label="Opción de respuesta: ${op}" tabindex="0">${op}</button>`).join('');
    }

    function aplicarModoOscuro() {
        if ($('body').hasClass('dark-mode')) {
            $('#quiz-app').addClass('dark-mode');
        } else {
            $('#quiz-app').removeClass('dark-mode');
        }
    }

    function mostrarPregunta() {
        const q = preguntasAleatorias[preguntaActual];
        const total = preguntasAleatorias.length;
        const actual = preguntaActual + 1;
        const barraProgreso = crearBarraProgreso(actual, total);
        const opcionesHtml = crearOpcionesHtml(q.opciones);
        $('#quiz-content').html(`
            ${barraProgreso}
            <div class="mb-4" role="region" aria-labelledby="pregunta-titulo">
                <h4 id="pregunta-titulo">Pregunta ${actual} de ${total}</h4>
                <p class="fs-5 mb-3">${q.pregunta}</p>
            </div>
            <div id="opciones" class="mb-3" role="group" aria-label="Opciones de respuesta">${opcionesHtml}</div>
            <div id="feedback" class="result mb-3" aria-live="polite"></div>
            <button id="siguiente-btn" class="btn btn-success mt-2" style="display:none;" role="button" aria-label="Siguiente pregunta">Siguiente</button>
        `);
        aplicarModoOscuro();
    }

    function mostrarResultado() {
        guardarPuntaje(puntaje, preguntasAleatorias.length);
        const mejores = obtenerMejoresPuntajes();
        const porcentaje = Math.round((puntaje / preguntasAleatorias.length) * 100);
        let mejoresHtml = '';
        if (mejores.length > 0) {
            mejoresHtml = `
                <div class="mt-4">
                    <h5 class="mb-3">🏆 Mejores Puntajes</h5>
                    <div class="list-group">
                        ${mejores
                            .map(
                                (intento, idx) => `
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <span>#${idx + 1} - ${intento.puntaje}/${intento.total} (${intento.porcentaje}%)</span>
                                <small class="text-muted">${formatearFecha(intento.fecha)}</small>
                            </div>
                        `
                            )
                            .join('')}
                    </div>
                    <button id="ver-historial-btn" class="btn btn-outline-secondary btn-sm mt-3">Ver Historial Completo</button>
                    <button id="limpiar-historial-btn" class="btn btn-outline-danger btn-sm mt-3 ms-2">Limpiar Historial</button>
                </div>
            `;
        }

        $('#quiz-content').html(`
            <div class="text-center">
                <h2>¡Quiz finalizado!</h2>
                <p class="fs-4">Tu puntaje: <strong>${puntaje} / ${preguntasAleatorias.length}</strong> (${porcentaje}%)</p>
                ${mejoresHtml}
                <button id="reiniciar-btn" class="btn btn-primary mt-3">Reiniciar Quiz</button>
            </div>
        `);
        aplicarModoOscuro();
        quizIniciado = false;
    }

    function mostrarHistorialCompleto() {
        const historial = obtenerHistorial();

        if (historial.length === 0) {
            $('#quiz-content').html(`
                <div class="text-center">
                    <h3>Historial de Intentos</h3>
                    <p class="text-muted mt-3">No hay intentos registrados aún.</p>
                    <button id="volver-btn" class="btn btn-secondary mt-3">Volver</button>
                </div>
            `);
        } else {
            const historialOrdenado = historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            const historialHtml = historialOrdenado
                .map(
                    (intento, idx) => `
                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Intento ${historial.length - idx}</strong>: ${intento.puntaje}/${intento.total} (${intento.porcentaje}%)
                        </div>
                        <small class="text-muted">${formatearFecha(intento.fecha)}</small>
                    </div>
                </div>
            `
                )
                .join('');

            $('#quiz-content').html(`
                <div>
                    <h3 class="text-center mb-4">📊 Historial Completo</h3>
                    <p class="text-center text-muted">Total de intentos: ${historial.length}</p>
                    <div class="list-group">
                        ${historialHtml}
                    </div>
                    <div class="text-center mt-4">
                        <button id="volver-btn" class="btn btn-secondary">Volver</button>
                    </div>
                </div>
            `);
        }

        aplicarModoOscuro();
    }

    // Eventos
    $(document).on('click', '#start-btn', function () {
        preguntaActual = 0;
        puntaje = 0;
        quizIniciado = true;
        preguntasAleatorias = mezclarPreguntas(preguntas);
        mostrarPregunta();
    });

    $(document).on('click', '.btn-answer', function () {
        if (!quizIniciado) return;
        const idx = parseInt($(this).data('idx'));
        const correcta = preguntasAleatorias[preguntaActual].respuesta;
        if (idx === correcta) {
            $('#feedback').text(TEXTO_CORRECTO).css('color', COLOR_CORRECTO);
            puntaje++;
        } else {
            $('#feedback').text(TEXTO_INCORRECTO).css('color', COLOR_INCORRECTO);
        }
        $('.btn-answer').attr('disabled', true);
        $(`.btn-answer[data-idx="${correcta}"]`).addClass('btn-success').removeClass('btn-outline-primary');
        $(this).not(`.btn-answer[data-idx="${correcta}"]`).addClass('btn-danger').removeClass('btn-outline-primary');
        $('#siguiente-btn').show();
    });

    $(document).on('click', '#siguiente-btn', function () {
        preguntaActual++;
        if (preguntaActual < preguntasAleatorias.length) {
            mostrarPregunta();
        } else {
            mostrarResultado();
        }
    });

    $(document).on('click', '#reiniciar-btn', function () {
        preguntaActual = 0;
        puntaje = 0;
        quizIniciado = true;
        preguntasAleatorias = mezclarPreguntas(preguntas);
        mostrarPregunta();
    });

    $(document).on('click', '#ver-historial-btn', function () {
        mostrarHistorialCompleto();
    });

    $(document).on('click', '#volver-btn', function () {
        $('#quiz-content').html(`
            <div id="start-screen" class="text-center">
                <h1 class="mb-3">Quiz de Trivia</h1>
                <p class="mb-4">Pon a prueba tus conocimientos respondiendo preguntas de cultura general. ¿Cuántas podrás acertar?</p>
                <button id="start-btn" class="btn btn-primary btn-lg">Comenzar Quiz</button>
            </div>
        `);
        aplicarModoOscuro();
    });

    $(document).on('click', '#limpiar-historial-btn', function () {
        if (confirm('¿Estás seguro de que deseas eliminar todo el historial? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('quizHistorial');
            mostrarResultado();
        }
    });
});
