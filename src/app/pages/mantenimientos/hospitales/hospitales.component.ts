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


  constructor(private hs: HospitalService) { }

  ngOnInit(): void {
    this.hs.cargarHospitalesService()
    .subscribe( hospitales => {
      console.log(hospitales);
    })
  }





}
