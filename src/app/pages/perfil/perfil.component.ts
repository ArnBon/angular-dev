import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup; // clase 190

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void { //clase 190

    this.perfilForm = this.fb.group({

      nombre:['123', Validators.required],
      email:['abc', [Validators.required, Validators.email] ],

    });
  }
  //clase 190
  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( resp => {
      console.log(resp);
    }
    )
  }

}
