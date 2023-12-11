import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/area/area';
import { DestinoDocumentoService } from 'src/app/services/destino-documento.service';

@Component({
  selector: 'app-listado-areas',
  templateUrl: './listado-areas.component.html',
  styleUrls: ['./listado-areas.component.css']
})
export class ListadoAreasComponent implements OnInit {
  areas: Area[];


  constructor(private _destinoDocumentoService: DestinoDocumentoService) { }

  ngOnInit() {
    this.areas = JSON.parse(localStorage.getItem('areas'));
    this.areas.filter(ar => ar.Estado != false);
  }
}
