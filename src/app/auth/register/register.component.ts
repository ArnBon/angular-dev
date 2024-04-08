import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public formSubmitted = false; //clase 167

  public registerForm = this.fb.group({
    nombre: ['',         Validators.required],
    email: ['', Validators.required, Validators.email], // agregado clase 167 Validators.email
    password: ['',        Validators.required],
    password2: ['',       Validators.required],
    terminos: [false,           Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  crearUsuarios(){
    this.formSubmitted = true; //clase 167
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
          console.log('posteando formulario')
      } else {
        console.log('Formulario no es correcto');
    }
  }

  campoNoValido( campo: string ): boolean { //clase 167

    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() { //clase 167
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

}
