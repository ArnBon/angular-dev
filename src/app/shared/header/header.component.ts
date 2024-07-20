import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
//clase 179
  constructor(private usuarioService: UsuarioService) { }

  logout() {
    this.usuarioService.logout();
  }
}
