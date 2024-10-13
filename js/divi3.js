var num1, num2, respuesta;  // Variables para los números y la respuesta de la operación  
txt_suma = document.getElementById("suma");  // Elemento HTML que mostrará la operación de división
op1 = document.getElementById("op1");  // Botón para la primera opción de respuesta
op2 = document.getElementById("op2");  // Botón para la segunda opción de respuesta
op3 = document.getElementById("op3");  // Botón para la tercera opción de respuesta
txt_msj = document.getElementById("msj");  // Elemento HTML para mostrar mensajes (éxito o error)
txt_resultado = document.getElementById("resultado");  // Elemento HTML que mostrará la respuesta seleccionada
let intentosSelect = document.getElementById("intentos-select");  // Selector para los intentos disponibles
let startButton = document.getElementById("start-button");  // Botón para iniciar el juego
let timerDisplay = document.getElementById("timer-display");  // Elemento HTML para mostrar el tiempo transcurrido
let scoreDisplay = document.getElementById("score-display");  // Elemento HTML para mostrar el marcador (aciertos y errores)
let intentosDisplay = document.getElementById("intentos-display");  // Elemento HTML para mostrar los intentos restantes
let monedasDisplay = document.getElementById("monedas-display");  // Elemento HTML para mostrar la cantidad de monedas acumuladas

// Evento que se ejecuta al hacer clic en el botón de inicio
document.getElementById('start-button').addEventListener('click', function() {
    var audio = document.getElementById('sonido');  // Reproduce un sonido cuando inicia el juego
    audio.currentTime = 0;  // Reinicia el audio al inicio
    audio.play().catch(function(error) {  // Muestra un error en consola si no se puede reproducir el sonido
        console.log('Error al reproducir el sonido:', error);
    });
});

let intentos = 0;  // Inicializa el contador de intentos
let aciertos = 0;  // Inicializa el contador de aciertos
let errores = 0;  // Inicializa el contador de errores
let monedas = 0;  // Inicializa el contador de monedas ganadas
let tiempoInicio = 0;  // Almacena el tiempo de inicio del juego
let tiempoFin = 0;  // Almacena el tiempo de fin del juego

// Función para comenzar el juego, generar una división y actualizar la interfaz
function comenzar() {
    txt_resultado.innerHTML = "?";  // Reinicia el campo de resultado
    txt_msj.innerHTML = "";  // Limpia los mensajes de éxito/error

    // Generar dos números aleatorios entre 1 y 10
    num2 = Math.floor(Math.random() * 10) + 1;  // num2 no puede ser 0
    num1 = num2 * (Math.floor(Math.random() * 10) + 1);  // num1 será un múltiplo de num2

    // Calcular la respuesta correcta
    respuesta = num1 / num2;

    // Mostrar la operación con números
    txt_suma.innerHTML = `${num1} ÷ ${num2} = `;

    // Elegir aleatoriamente el índice de la opción correcta
    let indiceOpCorrecta = Math.round(Math.random() * 2);

    // Colocar la opción correcta en un botón y opciones incorrectas en los otros
    if (indiceOpCorrecta == 0) {
        op1.innerHTML = respuesta;  // Opción correcta en el primer botón
        op2.innerHTML = respuesta + 1;
        op3.innerHTML = respuesta - 1;
    }
    if (indiceOpCorrecta == 1) {
        op1.innerHTML = respuesta - 1;
        op2.innerHTML = respuesta;  // Opción correcta en el segundo botón
        op3.innerHTML = respuesta - 2;
    }
    if (indiceOpCorrecta == 2) {
        op1.innerHTML = respuesta + 2;
        op2.innerHTML = respuesta + 3;
        op3.innerHTML = respuesta;  // Opción correcta en el tercer botón
    }
}

// Función para controlar la respuesta seleccionada por el usuario
function controlarRespuesta(opcionElegida) {
    txt_resultado.innerHTML = opcionElegida.innerHTML;  // Mostrar la respuesta seleccionada

    // Convertir la opción seleccionada a un número entero
    const opcionSeleccionada = parseInt(opcionElegida.innerHTML);

    if (respuesta === opcionSeleccionada) {  // Si la respuesta es correcta
        txt_msj.innerHTML = "EXCELENTE!!";
        txt_msj.style.color = "blue";
        aciertos++;  // Incrementa los aciertos

        // Aumentar el contador de monedas por cada respuesta correcta
        monedas++;
        monedasDisplay.innerHTML = monedas;  // Actualiza la visualización de monedas
    } else {  // Si la respuesta es incorrecta
        txt_msj.innerHTML = "ERROR!!";
        txt_msj.style.color = "red";
        errores++;  // Incrementa los errores
    }

    // Actualiza la visualización de aciertos, errores y monedas
    scoreDisplay.innerHTML = `Aciertos: ${aciertos}, Errores: ${errores}`;
    intentos--;  // Decrementa el número de intentos restantes
    intentosDisplay.innerHTML = `Intentos restantes: ${intentos}`;

    // Si quedan intentos, reiniciar el juego
    if (intentos > 0) {
        setTimeout(comenzar, 1000);  // Comienza un nuevo juego después de 1 segundo
    } else {  // Si no quedan intentos, mostrar el tiempo total y finalizar el juego
        tiempoFin = new Date().getTime();
        let tiempoTotal = (tiempoFin - tiempoInicio) / 1000;
        timerDisplay.innerHTML = `Tiempo: ${tiempoTotal.toFixed(2)} segundos`;
        alert(`Juego terminado! Tiempo: ${tiempoTotal.toFixed(2)} segundos`);
    }
}

// Función para reiniciar el juego y limpiar los valores
function limpiar() {
    txt_resultado.innerHTML = "?";  // Reiniciar el campo de resultado
    txt_msj.innerHTML = "";  // Limpiar el mensaje
    scoreDisplay.innerHTML = `Aciertos: 0, Errores: 0`;  // Reiniciar el marcador
    monedas = 0;  // Reiniciar el contador de monedas
    monedasDisplay.innerHTML = monedas;  // Actualizar la visualización de monedas
    intentosDisplay.innerHTML = `Intentos restantes: 0`;  // Reiniciar la visualización de intentos
    timerDisplay.innerHTML = `Tiempo: 0 segundos`;  // Reiniciar el tiempo
}

// Evento que inicia el juego al hacer clic en el botón de inicio
startButton.addEventListener("click", function() {
    intentos = parseInt(intentosSelect.value);  // Obtener el número de intentos seleccionados
    tiempoInicio = new Date().getTime();  // Registrar el tiempo de inicio
    aciertos = 0;  // Reiniciar el contador de aciertos
    errores = 0;  // Reiniciar el contador de errores
    comenzar();  // Iniciar el juego
});
