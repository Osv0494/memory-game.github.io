let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null; //null porque aun no sabemos el resultado.
let segundoResultado = null;
let movimientos = null;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicil = 60;
let tiempoRegresivoId = null;

let winAudio = new Audio("sound/win.wav");
let loseAudio = new Audio("sound/lose.wav");
let clickAudio = new Audio("sound/click.wav");
let rightAudio = new Audio("sound/right.wav");
let wrongAudio = new Audio("sound/wrong.wav");

//Apuntando documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//funciones
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer === 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      loseAudio.play();
    }
  }, 800);
}

//esta funcion nos va a mostrar todos los numeros dentro de las tarjetas luego las bloqueara
function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetasBloqueada = document.getElementById(i);
    tarjetasBloqueada.innerHTML = `<img src="/img/${numeros[i]}.png" alt="">`;
    tarjetasBloqueada.disabled = true;
  }
}

//Function prinsipal
function destapar(id) {
  if (temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas === 1) {
    //Mostrar primer numero
    tarjeta1 = document.getElementById(id); //hacemos un llamado al
    primerResultado = numeros[id]; //usaras esta variable para luego poder comparar las tarjetas
    tarjeta1.innerHTML = `<img src="/img/${primerResultado}.png" alt="">`; //innerHTML estamos imprimiendo en valor en el HTML
    clickAudio.play();

    //deshabilitar primer boton
    tarjeta1.disabled = true; //se desabilita el boton para que no lo puedas presionar dos veses
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="/img/${segundoResultado}.png" alt="">`;

    //desabilitar segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado === segundoResultado) {
      //encerrar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      rightAudio.play();

      if (aciertos === 8) {
        winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Correct: ${aciertos} 🥳`;
        mostrarTiempo.innerHTML = `fantastic  🥳 you only took time ${
          timerInicil - timer
        } seconds`;
        mostrarMovimientos.innerHTML = `Movements: ${movimientos} ✌️😎✌️`;
      }
    } else {
      wrongAudio.play();
      //mostrar momentaniamente valor y volverlo a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " "; //' ' logramos el efecto de que se vea mas opaca la tarjeta
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false; //se borra la targeta y cambia el numero
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}
