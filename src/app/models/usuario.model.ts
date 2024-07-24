import { environment } from '../../environments/environment';

const base_url = environment.base_url; // clase 187

export class Usuario {

  //imageUrl: any;

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

//clase 187
    get ImageUrl(){
debugger
      if (this.img.includes('https')) {
        return this.img;
      }
      if (this.img) {
        return `${ base_url }/upload/usuarios/${ this.img }`;

      } else {
        return `${ base_url }/upload/usuarios/no-image`;
      }
      console.log(this.img);
    }


    // get ImageUrl(){
    //   if(this.img){
    //    if(this.img.includes('https')){
    //     return this.img;
    //    }
    //    return `${ base_url }/upload/usuarios/${ this.img }`;
    //   } else {
    //     return `${ base_url }/upload/usuarios/no-image`;
    //   }
    //   console.log(this.img);
    // }

    // get ImageUrl() {
    //   debugger
    //   if(this.img) {
    //     return `${ base_url }/upload/usuarios/${ this.img }`;
    //   } else {
    //     return `${ base_url }/upload/usuarios/no-image`;
    //   }
    // }

    // get ImageUrl() {

    //     if ( !this.img ) {
    //         return `${ base_url }/upload/usuarios/no-image`;
    //     } else if ( this.img.includes('https') ) {
    //         return this.img;
    //     } else if ( this.img ) {
    //         return `${ base_url }/upload/usuarios/${ this.img }`;
    //     } else {
    //         return `${ base_url }/upload/usuarios/no-image`;
    //     }
    // }

}
