import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;




  constructor(private mS: MedicoService,
              private miS: ModalImagenService,
              private bS: BusquedasService ) { }

  ngOnDestroy(): void {
  this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarMedicosComponent(); //clase 227

    //clase 228
    /*con esto se recarga la pagina autoamticamente cuando
    algo cambia en especial la foto*/
    this.imgSubs = this.imgSubs = this.miS.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarMedicosComponent() );
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

//clase 228

buscarComponent(termino: string){
  if (termino.length === 0) {
    return this.cargarMedicosComponent();
  }
  this.bS.buscarService('medicos', termino)
  .subscribe(resp => {
    this.medicos = resp;
  });
}




}
