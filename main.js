let tablero = new Tablero();
tablero.crearCasillas();

let dado = new Dado();

let jugador1 = new Jugador(1);
jugador1.setPosicion(tablero.getCasilla(0));

let jugador2 = new Jugador(2);
jugador2.setPosicion(tablero.getCasilla(0));

let dadoNumero = 0;

dibujarTablero(tablero.getCasillas());


document.getElementById('btnJugador1').addEventListener('click', () => {
  
   dadoNumero = lanzarDado();
   
   document.getElementById('btnJugador1').disabled = true;

   setTimeout( () => {      
   
         if (tieneEscaleraSerpiente(jugador1, dadoNumero, tablero.getCasillas())) {

            redibujar(jugador1, jugador2, 'morado');

            dibujarCamino(jugador1, dadoNumero, 'morado');            

            setTimeout( () => {            
               
               redibujar(jugador1, jugador2, 'morado');
   
               jugador1.avanzar(dadoNumero, tablero.getCasillas());
   
               dibujarPosicion(jugador1, 'morado');

               if (gano(jugador1) == false) {
                  document.getElementById('btnJugador2').disabled = false;
               }

            }, 400);

         }
         else {
            
            let mensaje = document.getElementById('mensaje');

            mensaje.classList.remove('show');

            redibujar(jugador1, jugador2, 'morado');
   
            jugador1.avanzar(dadoNumero, tablero.getCasillas());   
         
            dibujarPosicion(jugador1, 'morado');

            if (gano(jugador1) == false) {
               document.getElementById('btnJugador2').disabled = false;
            }
                     
         }

   }, 400);


});

document.getElementById('btnJugador2').addEventListener('click', () => {
  
   dadoNumero = lanzarDado();

   document.getElementById('btnJugador2').disabled = true;

   setTimeout( () => {      
   
         if (tieneEscaleraSerpiente(jugador2, dadoNumero, tablero.getCasillas())) {

            redibujar(jugador2, jugador1, 'verde');

            dibujarCamino(jugador2, dadoNumero, 'verde');            

            setTimeout( () => {            
               
               redibujar(jugador2, jugador1, 'verde');
   
               jugador2.avanzar(dadoNumero, tablero.getCasillas());
               
               dibujarPosicion(jugador2, 'verde');
                  
               if (gano(jugador2) == false) {
                  document.getElementById('btnJugador1').disabled = false;
               }
   
            }, 400);

         }
         else {

            let mensaje = document.getElementById('mensaje');
            mensaje.classList.remove('show');
   
            redibujar(jugador2, jugador1, 'verde');
   
            jugador2.avanzar(dadoNumero, tablero.getCasillas());
            
            dibujarPosicion(jugador2, 'verde');         
   
            if (gano(jugador2) == false) {
               document.getElementById('btnJugador1').disabled = false;
            }   

         }

   }, 400);


});

let btnReiniciar = document.getElementById('btnReiniciar').addEventListener('click', reiniciar);

function reiniciar() {

   document.getElementById('mensaje').classList.remove('show');
   
   document.getElementById('contReiniciar').classList.remove('show');

   let casilla1 = document.getElementById(`casilla${jugador1.getPosicion()}`);
   casilla1.classList.remove('morado');
   casilla1.classList.remove('enCasilla');

   let casilla2 = document.getElementById(`casilla${jugador2.getPosicion()}`);
   casilla2.classList.remove('verde');
   casilla2.classList.remove('enCasilla');

   dadoNumero = 0;

   let dadoImg = document.getElementById('numDado');
   dadoImg.src = `img/1.png`;
   
   jugador1.setPosicion(0);
   jugador2.setPosicion(0);

   document.getElementById('btnJugador1').disabled = false;

}

function dibujarTablero (casillas) {

   let conC = 1;
   
   for (let i = casillas.length - 1; i > 0; i--) {

      let contTablero = document.getElementById('tablero');
      
      let casilla = document.createElement('div');
      casilla.setAttribute('id', 'casilla' + (i));
      casilla.classList.add('casillaLeft');         
      
      if (i % 10 == 0) {
         conC += 1;
      }

      if ( conC % 2 != 0) {
         casilla.classList.remove('casillaLeft');
         casilla.classList.add('casillaRight');         
      }


      contTablero.appendChild(casilla);

   }

}

function lanzarDado () {

   numero = dado.lanzar();


   let dadoImg = document.getElementById('numDado');
   dadoImg.src = `img/${numero}.png`;
   dadoImg.classList.add('rotar');
   
   setTimeout( () => {
      dadoImg.classList.remove('rotar');
   }, 200);

   return numero;

} 

function dibujarPosicion (jugador, color) {

   let posicion = document.getElementById('casilla' + jugador.getPosicion());
   posicion.classList.add(`${color}`);
   posicion.classList.add('enCasilla');

}

function dibujarCamino (jugador, posiciones, color) {

   if (jugador.getPosicion() + posiciones > 100) {

      let posicion = document.getElementById(`casilla${100 - (posiciones - (100 - jugador.getPosicion()))}`);
      posicion.classList.add(`${color}`);
      posicion.classList.add('enCasilla');

      setTimeout( () => {
      
         posicion.classList.remove(`${color}`);
         posicion.classList.remove('enCasilla');


      }, 400);

   }
   else {    

      let posicion = document.getElementById(`casilla${jugador.getPosicion() + posiciones}`);
      posicion.classList.add(`${color}`);
      posicion.classList.add('enCasilla');
      
      setTimeout( () => {
      
         posicion.classList.remove(`${color}`);
         posicion.classList.remove('enCasilla');


      }, 400);
   
   }


}

function redibujar (jugadorP, jugadorS, color) {
   
   if (jugadorP.getPosicion() != 0) {

      let anteriorPosicion = document.getElementById('casilla' + jugadorP.getPosicion());
      anteriorPosicion.classList.remove(`${color}`);
     
      if (jugadorS.getPosicion() != jugadorP.getPosicion()) {

         anteriorPosicion.classList.remove('enCasilla');
         
      }

   }
}

function tieneEscaleraSerpiente (jugador, posiciones, casillas) {

   if(jugador.tieneEscalera(posiciones, casillas)) {

      let mensaje = document.getElementById('mensaje');
      mensaje.textContent = '! ESCALERA ¡';
      mensaje.style.display = 'inline-block';

      setTimeout( () => {

         mensaje.classList.add('show');

      });

      return true;

   }
   else if (jugador.tieneSerpiente(posiciones, casillas)) {

      let mensaje = document.getElementById('mensaje');
      mensaje.textContent = '! SERPIENTE ¡';
      mensaje.style.display = 'inline-block';

      setTimeout( () => {
         
         mensaje.classList.add('show');

      });

      return true;

   }

}

function gano (jugador) {
   
   if (tablero.gano(jugador)) {

      let mensaje = document.getElementById('mensaje');
      mensaje.textContent = `¡ Jugador ${jugador.getNumero()} ganó !`;
      mensaje.style.display = 'inline-block';
      
      setTimeout( () => {

         mensaje.classList.add('show');

      });

      let contReiniciar = document.getElementById('contReiniciar');
      contReiniciar.style.display = 'inline-block';
      
      setTimeout( () => {

         contReiniciar.classList.add('show');

      });

      document.getElementById('btnJugador1').disabled = true;
      document.getElementById('btnJugador2').disabled = true;

   }
   else {

      return false;

   }

}
