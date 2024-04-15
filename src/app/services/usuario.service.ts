import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm){
    // console.log('creando usuario');
    return this.http.post(`${base_url}/usuarios`, formData);
  }


  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData )



  }
}
