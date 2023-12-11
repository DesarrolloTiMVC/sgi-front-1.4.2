import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../services/documento.service';
import { Documento } from './documento';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  listadoDocumentos: any[]
  dataSource = new MatTableDataSource(this.listadoDocumentos);
  displayedColumns: ["Id","Codigo","Descripcion"]
  checked =false

  constructor(
    private _documentoService: DocumentoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar, 
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.listarDocumentos()
  }

  /**
   *
   */
  listarDocumentos(){
    this._documentoService.listar()
    .subscribe(data => { 
      console.log(data);
      this.listadoDocumentos = data;
    })
  }
}