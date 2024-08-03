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
  public usuario: Usuario;

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


   /* validarToken(): Observable<boolean> {//con esta validacion no entra si no esta autenticado
      const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        //console.log(resp);
        const{email,google,img,nombre,role,uid} = resp.usuario //ojo aqui
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid  )
        this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );//Nota: hay que crear la instancia si se quiere tener acceso a los metodos y propiedades de alguna clase
  }*/

    /**clase 188 */
    /* validarToken(): Observable<boolean> {//con esta validacion no entra si no esta autenticado
      const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        //console.log(resp);
        const{email,google,img = '',nombre,role,uid} = resp.usuario //ojo aqui
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid  )
        this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token );
        return true;
      }),
      map( resp => true),
      catchError( error => of(false) )
    );//Nota: hay que crear la instancia si se quiere tener acceso a los metodos y propiedades de alguna clase
  }*/
 /**fin de esta funcion para esta clase 188 */

 /*para la clase 190 la funcion valdarToken queda asi por lo del getToken */

validarToken(): Observable<boolean> {//con esta validacion no entra si no esta autenticado
      //se quito esto const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token // y este se agrego el this.token
      }
    }).pipe(
      map( (resp: any) => {
        //console.log(resp);
        const{email,google,img = '',nombre,role,uid} = resp.usuario //ojo aqui
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid  )
        this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token );
        return true;
      }),
      map( resp => true),
      catchError( error => of(false) )
    );
  }
 /**fin de esta funcion */


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




/*clase 190
funcion actualziarPerfil se debe recibir lad ata que se quiere actualizar
entonces se le pasa por parametros
*/



actualizarPerfil(data: { email: string, nombre: string, role: string }){
    data = {
          ...data,
          role: this.usuario.role
        };
        return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
          headers: {
            'x-token': this.token
          }
        });
}




/*Getter y Setter*/
get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }

}
