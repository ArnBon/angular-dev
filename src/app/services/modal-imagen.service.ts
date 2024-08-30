import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModalService: boolean = true;

  get ocultarModalSer(){
    return this._ocultarModalService;
  }

  abrirModalService(){
    this._ocultarModalService = false
  }

  cerrarModalService(){
    this._ocultarModalService = true;
  }





  constructor() { }



}






