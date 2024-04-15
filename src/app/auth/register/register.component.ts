import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public formSubmitted = false; //clase 167

  public registerForm = this.fb.group({
    nombre:    ['',    Validators.required],
    email:     ['',    Validators.required, Validators.email], // agregado clase 167 Validators.email
    password:  ['',    Validators.required],
    password2: ['',    Validators.required],
    terminos:  [false, Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  // crearUsuarios(){
  //   this.formSubmitted = true; //clase 167
  //   console.log(this.registerForm.value);
  //   console.log(this.registerForm);

  //   if (this.registerForm.valid) {
  //         console.log('posteando formulario')
  //     } else {
  //       console.log('Formulario no es correcto');
  //   }
  // }

  //clase 170
  crearUsuarios(){
    this.formSubmitted = true; //clase 167
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
          return;
  }

  //realizar posteo
  this.usuarioService.crearUsuario(this.registerForm.value)
  .subscribe(resp => {
    console.log('usuario creado')
    console.log(resp);
  }, (err) => {
    Swal.fire('Error', err.error.msg, 'error');

    //console.warn(err.error.msg));
  });

}

  campoNoValido( campo: string ): boolean { //clase 167

    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 != pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  aceptaTerminos() { //clase 167
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(passName1: string, passName2: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(passName1);
      const pass2Control = formGroup.get(passName2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({noEsigual: true})
      }
    }
  }
}
