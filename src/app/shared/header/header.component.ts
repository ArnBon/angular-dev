import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
//clase 179
 public usuarios: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuarios = usuarioService.usuarios
   }

  logout() {
    this.usuarioService.logout();
  }
}
