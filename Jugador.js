class Jugador {

   constructor(numero) {

      this.posicion = null;
      this.numero = numero;

   }

   setPosicion(posicion) {

      this.posicion = posicion;

   }

   getPosicion() {

      return this.posicion;

   }

   setNumero(numero) {

      this.numero = numero;
      
   }

   getNumero() {

      return this.numero;
      
   }

   avanzar (posiciones, casillas) {

      if (this.posicion + posiciones > 100) {

         this.posicion = casillas[100 - (posiciones - (100 - this.posicion))];

      }
      else {

         this.posicion = casillas[this.posicion + posiciones];

      }

   }

   tieneEscalera(posiciones, casillas) {

      if(casillas[this.posicion + posiciones] > this.posicion + posiciones) {

         return true;

      }
      else {

         return false;
      
      }

   }

   tieneSerpiente(posiciones, casillas) {

      if (this.posicion + posiciones > 100) {

         if(casillas[100 - (posiciones - (100 - this.posicion))] < (100 - (posiciones - (100 - this.posicion)))) {

            return true;
   
         }

      }
      else {

         if(casillas[this.posicion + posiciones] < this.posicion + posiciones) {

            return true;

         }
         else {

            return false;
      
         }
   
      }

   }

}