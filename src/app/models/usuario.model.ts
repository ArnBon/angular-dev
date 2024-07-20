export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

     //clase 186
    //   imprimirUsuario(){
    //   console.log(this.nombre);
    // }

}
