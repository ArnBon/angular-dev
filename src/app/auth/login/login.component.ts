import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn') googleBtn: ElementRef;

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
               private ngZone: NgZone) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.googleInit
  }

  googleInit(){
    google.accounts.id.initialize({
                 client_id: '8589823097-updhvjj16j3d1jucp8jd1j0j7dbkgi43.apps.googleusercontent.com',
                //  callback: this.handleCredentialResponse
                callback: (response: any) => this.handleCredentialResponse(response) //clase 177
             });

             google.accounts.id.renderButton(
                //  document.getElementById("buttonDiv"),
                this.googleBtn.nativeElement,
                 {   theme: "outline",
                     size: "large"
                 } // customization attributes
             );
  }

  handleCredentialResponse(response: any){
    // console.log({esto: this});
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
    .subscribe(resp => {
      // console.log({login: resp}); //para pruebas
      this.router.navigateByUrl('/');
    })
  }

  login(){
    // this.router.navigateByUrl('/')
    // console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      console.log(resp)
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }

      //Navegar al dashboard
      this.router.navigateByUrl('/');

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }


    attachSignin(element) {

    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                  this.router.navigateByUrl('/');
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

  logout() {
    this.router.navigateByUrl('/');
  }

}
