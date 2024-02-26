import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  // @Input('valor') progreso: number = 40; RENOMBRAR EL ARGUMENTO
  @Input('valorEntrada') progreso: number = 40;
  @Input() btnClass: string = 'btn btn-primary';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

    cambiarValor(valor: number){

      if (this.progreso >= 100 && valor >= 0) {
        this.valorSalida.emit(100);
        return this.progreso = 100;
      }

      if (this.progreso <= 0 && valor < 0 ) {
        this.valorSalida.emit(0);
        return this.progreso = 0;
      }
      this.progreso = this.progreso + valor;
      this.valorSalida.emit(this.progreso);
    }
    ngOnInit(): void {

      this.btnClass = `btn ${this.btnClass}`
    }
  }
