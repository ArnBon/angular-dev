import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false; //clase 167

  public loginForm = this.fb.group({
    email:     ['',    Validators.required, Validators.email], // agregado clase 167 Validators.email
    password:  ['',    Validators.required],
    remember: [false]
  }, {
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService:UsuarioService
  ) { }

  login(){
    // this.router.navigateByUrl('/')
    // console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      console.log(resp)
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  logout() {
    this.router.navigateByUrl('/');
  }

}
