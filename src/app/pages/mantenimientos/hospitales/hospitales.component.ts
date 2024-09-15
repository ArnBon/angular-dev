import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public hospitales:Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private hs: HospitalService,
              private mis: ModalImagenService,
              private bs: BusquedasService //clase 225
  ) { }

  ngOnInit(): void {
    this.cargarHospitalesComponent();

    this.imgSubs = this.imgSubs = this.mis.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarHospitalesComponent() );
  }

  cargarHospitalesComponent(){
    this.cargando = true;
    this.hs.cargarHospitalesService() //aqui cargas lo del servicio o sea la funcion
    .subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      console.log(hospitales);
    });
  }

  //esta funcion es para actualizar
  guardarCambios(hospital: Hospital){
    this.hs.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe( resp => {
      Swal.fire( 'Actualizado', hospital.nombre, 'success' );
    });

    }

  eliminarHospital(hospital: Hospital){
    this.hs.borrarHospital(hospital._id)
    .subscribe( resp => {
      this.cargarHospitalesComponent();
      Swal.fire( 'Borrado', hospital.nombre, 'success' );
    });
  }


  async abrirSweetAlert(){
     const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.hs.crearHospital( value )
        .subscribe( (resp: any) => {
          this.hospitales.push( resp.hospital )
        })
    }

  }

  abrirModal(hospital: Hospital){
    this.mis.abrirModalService( 'hospitales', hospital._id, hospital.img );

  }

  //clase 225
  buscarComponent(termino: string){
    if (termino.length === 0) {
      return this.cargarHospitalesComponent();
    }
    this.bs.buscarService('hospitales', termino)
    .subscribe( resp => {
      this.hospitales = resp;
    });
  }









}
