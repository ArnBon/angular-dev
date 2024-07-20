import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { Usuario } from '../models/usuario.model';


// declare const google: any;
declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuarios: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
    this.googleInit();
  }

    //codigo que estuvo bien hasta el video 179
  // googleInit() {
  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //       client_id: '8589823097-updhvjj16j3d1jucp8jd1j0j7dbkgi43.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //     });
  //   });
  // }


  //codigo del video 180 que sustituye al codigo del video 179


  googleInit() {

    return new Promise<void>(( resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '8589823097-updhvjj16j3d1jucp8jd1j0j7dbkgi43.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }


    // logout(){
  //     localStorage.removeItem('token');
  //     // google.accounts.id.revoke('gaby@gmail.com', () => {
  //       this.auth2.signOut().then( () => {
  //       this.router.navigateByUrl('/login');
  //     })
  // }

logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

    //con esta validacion no entra si no esta autenticado
    validarToken(): Observable<boolean> {

      const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        console.log(resp);


        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuarios = new Usuario(nombre, email, '', img, google, role, uid );

        this.usuarios = resp.usuario; //clase 186
        //this.usuarios.imprimirUsuario(); //clase 186


        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

  crearUsuario(formData: RegisterForm){
    // console.log('creando usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
     .pipe(
            tap( (resp: any) => {
              console.log(resp)
              localStorage.setItem('token', resp.token )
            })
          );
  }


  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    console.log(resp)
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

  loginGoogle( token: string ) {

    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    console.log(resp)
                    localStorage.setItem('token', resp.token )
                  })
                );

  }









}
