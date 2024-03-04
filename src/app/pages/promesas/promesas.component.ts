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

  const promesa = new Promise( (resolve, reject) => {
    if (true) {
      resolve ('Hola Mundo');
      }else {
        reject('Algo salio mal');
    }
  });
    promesa.then((mensaje) => {
        console.log(mensaje);
      })
      .catch(error => console.log("error", error));

    console.log('fin del init');
      }


    }


