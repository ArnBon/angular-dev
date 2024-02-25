import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {

    progreso1: number = 25;
    progreso2: number = 35;
    progreso: number = 40;

    get getProgreso1() {
      return `${ this.progreso1 }%`;
    }

    get getProgreso2() {
      return `${ this.progreso2 }%`;
    }


    get getPorcentaje() {
      return `${ this.progreso }%`;
    }



    cambiarValor(valor: number){

      if (this.progreso >= 100 && valor >= 0) {
        return this.progreso = 100;
      }

      if (this.progreso <= 0 && valor < 0 ) {
        return this.progreso = 0;
      }
this.progreso = this.progreso + valor;
    }




}
