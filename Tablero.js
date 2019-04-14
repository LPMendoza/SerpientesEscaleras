class Tablero {

   constructor() {
      this.casillas = [];
   }

   crearCasillas() {

      for (let i = 0; i <= 100; i++) {

         this.casillas.push(i);

      }

      //Asignación de escaleras
      this.casillas[80] = 100;
      this.casillas[28] = 84;
      this.casillas[3] = 21;
      this.casillas[58] = 77;
      this.casillas[90] = 91;
      this.casillas[75] = 86;
      this.casillas[8] = 30;

      //Asignación de serpientes
      this.casillas[17] = 13;
      this.casillas[52] = 29;
      this.casillas[57] = 40;
      this.casillas[62] = 22;
      this.casillas[88] = 18;
      this.casillas[97] = 79;
      this.casillas[95] = 70;

   }

   getCasilla(numeroCasilla) {

      return this.casillas[numeroCasilla];

   }

   getCasillas() {
      return this.casillas;
   }

   gano(jugador) {

      if (jugador.getPosicion() == 100) {

         return true;

      }

   }


}