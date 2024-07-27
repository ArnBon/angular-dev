import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

    //clase 187
public usuario: Usuario;

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService ) {

    this.menuItems = sidebarService.menu;
    //this.imgUrl = usuarioService.usuario.imagenUrl; //clase 187
    /*Esto si es una instancia del modelo usuario
    tengo acceso a los getter y setter*/
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
