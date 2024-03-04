import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //   const promesa = new Promise( (resolve) => {
  //     resolve ('Hola Mundo');
  //   });

  //   promesa.then(() => {
  //     console.log('terminado');
  //   })
  //   console.log('fin del init');
  // }

  // const promesa = new Promise( (resolve, reject) => {
  //   if (true) {
  //     resolve ('Hola Mundo');
  //     }else {
  //       reject('Algo salio mal');
  //   }
  // });
  //   promesa.then((mensaje) => {
  //       console.log(mensaje);
  //     })
  //     .catch(error => console.log("error", error));

  //   console.log('fin del init');

    this.getUsuarios().then(usuarios => {
        console.log(usuarios);
    });

      }

      // getUsuarios() {
      //   fetch('http://regres.in/api/users')
      //   .then(resp => {
      //     resp.json().then (body => console.log(body))
      //   });
      // }

      getUsuarios() {
        // const promesa = new Promise (resolve => {
          return new Promise( resolve => {
            fetch('https://regres.in/api/users')
            .then(resp => resp.json())
            .then(body => resolve(body.data));
            });
          }
          // return promesa;
}
