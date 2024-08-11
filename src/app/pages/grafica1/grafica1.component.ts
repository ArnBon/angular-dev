import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  constructor() { }

public labels1: string[] = ['pan', 'tacos', 'Refresco'];
public data1 = [
  [10,15,40],
]


  ngOnInit(): void {
  }

}
