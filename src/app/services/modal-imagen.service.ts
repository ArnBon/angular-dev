import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModalService: boolean = true;
  public tipo: string;
  public id: string;
  public img: string;

  get ocultarModalSer(){
    return this._ocultarModalService;
  }

  // localhost:3000/api/upload/medicos/no-img
  abrirModalService(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string = 'no-img'){
    this._ocultarModalService = false;
     this.tipo = tipo;
    this.id = id;
      if ( img.includes('https') ) {
        this.img = img;
      } else {
        this.img = `${ base_url }/upload/${ tipo }/${ img }`;
      }
  }

  cerrarModalService(){
    this._ocultarModalService = true;
  }





  constructor() { }



}






