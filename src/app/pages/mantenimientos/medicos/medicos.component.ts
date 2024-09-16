import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = true;
  public medicos: Medico[] = [];




  constructor(private mS: MedicoService,
              private miS: ModalImagenService,
              private bS: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarMedicosComponent(); //clase 227
  }

  //clase 227
  cargarMedicosComponent(){
    this.cargando = true;
    this.mS.cargarMedicosService()
    .subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
      console.log(medicos);
    });

  }


  abrirModalComponent(medico: Medico){
this.miS.abrirModalService( 'medicos', medico._id, medico.img );
  }
//clase 227




}
