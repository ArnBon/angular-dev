import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //clase 187
//public imgUrl = '';
public usuario: Usuario; //clase 187

//clase 179
  constructor(private usuarioService: UsuarioService) {
    //this.imgUrl = usuarioService.usuario.imagenUrl; //clase 187

    /*Esto si es una instancia del modelo usuario
    tengo acceso a los getter y setter*/
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }
}
