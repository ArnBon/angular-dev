import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = []; // se inicializa vacio
  public desde: number = 0;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  //clase 203
  cambiarPagina(valor: number){
    /**esto es para tenenr el control de la
     * paginacion
     */
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -=valor;
    }
    this.cargarUsuarios();
  }

  cargarUsuarios(){

    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      if (usuarios.length !== 0) {
        this.usuarios = usuarios;
      }

      console.log(total);
      console.log(usuarios);
    })
  }

}
