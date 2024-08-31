import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = []; // se inicializa vacio
  public desde: number = 0;
  public cargando: boolean = true;
  public usuariosTemp:Usuario[] = [];
  public imgSubs: Subscription; //clase 211

  constructor(private usuarioService:UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
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

    this.cargando = true; //clase 205
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.cargando = false; //clase 205
      this.usuariosTemp = usuarios; //clase 207

      // if (usuarios.length !== 0) {
        //   this.usuarios = usuarios;
        // }


      console.log(total);
      console.log(usuarios);
    })
  }

  buscar(termino: string){
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino)
    .subscribe(resp => {
      this.usuarios = resp;
    });
  }

eliminarUsuarioComponent(usuario: Usuario){

  if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

  Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuarioService( usuario )
          .subscribe( resp => {

            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

}

cambiarRole(usuario:Usuario){
  this.usuarioService.guardarUsuarioService(usuario)
  .subscribe(resp => {
    console.log(resp);
  });

}

abrirModalUsuario(usuario:Usuario){
  console.log(usuario);
  this.modalImagenService.abrirModalService('usuarios', usuario.uid, usuario.img);
  //esos argumentos se pasaron en la clase 213
}


}
