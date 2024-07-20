import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  public formSubmitted = false; //clase 167
  public auth2: any;

  public loginForm = this.fb.group({
    email:     [ localStorage.getItem('email') || '',    [Validators.required, Validators.email] ], // agregado clase 167 Validators.email
    password:  ['',    Validators.required],
    remember: [false]

  }, {
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone: NgZone) {

                this.googleInit();
                }

  ngOnInit(): void {
    // this.renderButton();
    this.googleInit();
  }

  ngAfterViewInit(): void {
     this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '8589823097-updhvjj16j3d1jucp8jd1j0j7dbkgi43.apps.googleusercontent.com',
      // callback: this.handleCredentialResponse
    callback: (response: any) => this.handleCredentialResponse(response) //clase 177
  });
    google.accounts.id.renderButton(
        //document.getElementById("buttonDiv"),
       this.googleBtn?.nativeElement,
        {   theme: "outline", size: "large"
        } // customization attributes
    );
  }

  /*handleCredentialResponse(response: any){
    // console.log({esto: this});
     console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
    .subscribe(resp => {
      //  console.log({login: resp}); //para pruebas
      this.router.navigateByUrl('/');
    })
  }*/

    handleCredentialResponse(response: any){
      // console.log("Encoded JWT ID token: " + response.credential);
      this.usuarioService.loginGoogle(response.credential)
    .subscribe((resp) => {
      this.ngZone.run( () => {
        console.log({login: resp});
       this.router.navigateByUrl('/');
      });
    });
    }


  login(){
    // this.router.navigateByUrl('/')
     console.log(this.loginForm.value);
   //debugger
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      console.log(resp)

      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }

      //Navegar al dashboard
      //debugger
      this.router.navigate(['/']);

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }


  //me di cuenta en la clase 179 esta mal construida la seccion 14

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  //

  // logout() {
  //   this.router.navigateByUrl('/');
  // }
//me di cuenta en la clase 179 esta mal construida la seccion 14
   async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin( document.getElementById('my-signin2') );
  };

  // startApp() {
  //   gapi.load('auth2', () => {

  //     this.auth2 = gapi.auth2.init({
  //       client_id: '8589823097-updhvjj16j3d1jucp8jd1j0j7dbkgi43.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //     });
  //     this.attachSignin(document.getElementById('my-signin2'));
  //   });
  // }


//
    //   attachSignin(element) {

  //   this.auth2.attachClickHandler( element, {},
  //       (googleUser) => {
  //           const id_token = googleUser.getAuthResponse().id_token;
  //           // console.log(id_token);
  //           this.usuarioService.loginGoogle( id_token )
  //             .subscribe( resp => {
  //               // Navegar al Dashboard
  //                 this.router.navigateByUrl('/'); //el error que daba en el video era por esta linea lo sustitui por el del codigo de final de seccion
  //             });

  //       }, (error) => {
  //           alert(JSON.stringify(error, undefined, 2));
  //       });
  // }

  //codigo de final de seccion
  attachSignin(element) {

    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }


}
