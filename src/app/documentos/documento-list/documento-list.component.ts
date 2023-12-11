import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/services/documento.service';
import { Documento } from '../documento';

@Component({
  selector: 'app-documento-list',
  templateUrl: './documento-list.component.html',
  styleUrls: ['./documento-list.component.css']
})
export class DocumentoListComponent implements OnInit {

  listadoDocumentos:  Documento[]
  tituloColumnas: ['Id', 'Codigo', 'Descripcion']
  
  constructor(private _documentoService: DocumentoService) { }

  ngOnInit() {
    this.listarDocumentos()
  }

  listarDocumentos(){
    this._documentoService.listar()
    .subscribe(data => { 
      this.listadoDocumentos = data 
    })
  }
}
