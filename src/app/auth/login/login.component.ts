import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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

  public loginForm = this.fb.group({
    email:     [ localStorage.getItem('email') || '',    [Validators.required, Validators.email] ], // agregado clase 167 Validators.email
    password:  ['',    Validators.required],
    remember: [false]
  }, {
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.googleInit
  }

  googleInit(){
    google.accounts.id.initialize({
                 client_id: '8589823097-updhvjj16j3d1jucp8jd1j0j7dbkgi43.apps.googleusercontent.com',
                 callback: this.handleCredentialResponse
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
    console.log("Encoded JWT ID token: " + response.credential);
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
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  logout() {
    this.router.navigateByUrl('/');
  }

}
