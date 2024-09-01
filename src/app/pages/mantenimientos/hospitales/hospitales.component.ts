import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public hospitales:Hospital[] = [];
  public cargando: boolean = true;

  constructor(private hs: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitalesComponent()
  }

  cargarHospitalesComponent(){
    this.cargando = true;
    this.hs.cargarHospitalesService() //aqui cargas lo del servicio o sea la funcion
    .subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      console.log(hospitales);
    })
  }







}
