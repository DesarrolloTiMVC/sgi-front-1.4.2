import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/area/area';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  areas: Area[]
  constructor() { }

  dataSource: MatTableDataSource<Area>;
  tituloColumnas: string[] = ['area','ir']

  ngOnInit() {
    this.listarAreas()
  }

  listarAreas(){
    this.areas = JSON.parse(localStorage.getItem('areas'))
    this.areas = this.areas.filter(item => item.Estado == true);
    this.dataSource = new MatTableDataSource(this.areas)
  }
}
