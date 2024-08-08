import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup; // clase 190
  public usuario: Usuario; //clase 191
  public imagenSubir: File; // clase 192

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario; //clase 191
  }

  ngOnInit(): void { //clase 190

    this.perfilForm = this.fb.group({

      // nombre:['123', Validators.required],
      // email:['abc', [Validators.required, Validators.email] ], para pruebas

      //clase  191
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email] ],
    });
  }
  //clase 190
  // actualizarPerfil(){
  //   console.log(this.perfilForm.value);
  //   this.usuarioService.actualizarPerfil(this.perfilForm.value)
  //   .subscribe( resp => {
  //     console.log(resp);
  //   }
  //   )
  // }
// fin clase 190

/**clase 191 */
actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( () => {
      const {nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email  = email;

       Swal.fire('Actualizado', 'Cambios fueron actualizados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
    }

cambiarImagen( file: File ){
  console.log(file);
  this.imagenSubir = file;
}


subirImagen(){
  this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => console.log(img) );
}


  }




/**fin clase 191 */



