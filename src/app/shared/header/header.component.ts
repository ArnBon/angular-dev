import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  debugger
//clase 179
  public usuarios: Usuario;
  //clase 187
  //public imgUrl = '';

  constructor(private usuarioService: UsuarioService) {
    //this.imgUrl = usuarioService.usuarios.ImageUrl;

     this.usuarios = usuarioService.usuarios; //esto es una instancia del modelo
  }

  logout() {
    this.usuarioService.logout();
  }
}
