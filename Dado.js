class Dado {

   lanzar() {

      this.valor = Math.floor(Math.random() * 6) + 1;

      return this.valor;

   }

}