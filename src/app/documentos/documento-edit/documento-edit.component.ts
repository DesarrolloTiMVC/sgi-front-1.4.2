import { Component, OnInit } from '@angular/core';
import { Documento } from '../documento'
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/area/area';
import { SelectionModel } from '@angular/cdk/collections';
import { DocumentoService } from 'src/app/services/documento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { matFormFieldAnimations, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { DestinoDocumentoService } from 'src/app/services/destino-documento.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { DestinoDocumento } from 'src/app/destino-documento/destino-documento';
import { TipoDocumento } from 'src/app/tipo-documento/tipo-documento';


@Component({
  selector: 'app-documento-edit',
  templateUrl: './documento-edit.component.html',
  styleUrls: ['./documento-edit.component.css']
})
export class DocumentoEditComponent implements OnInit {

  public formDocumento: FormGroup
  public submitted = false
  public listadoAreas: Area[]
  editDocumento = new Documento
  public documentoGuardado: Documento
  dataSource: MatTableDataSource<Area> 
  
  fileToUpload: File
  selection = new SelectionModel<Area>(true, []);

  listadoTipoDocumento: TipoDocumento[]
  listadoDestinoDocumento: DestinoDocumento[]

  tituloColumnas = ['Seleccionar','Nombre','Descripcion']
  nombre = 'DocumentosCreate'
  documentoId: any
  

  constructor(
    private formBuilder: FormBuilder,
    private _areaService: AreaService,
    private _documentoService: DocumentoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _destinoDocumentoService: DestinoDocumentoService,
    private _tipoDocumentoService: TipoDocumentoService
  ) { }

  ngOnInit() {
    this.documentoId = this._activatedRoute.snapshot.paramMap.get("Id")
    this.buildForm()
   
    this.listarAreas()
    this.listarDestinoDocumento()
    this.listarTipoDocumento()

    this.listarDocumentoPorId(this.documentoId);
  }

  private buildForm(){
    this.formDocumento = this.formBuilder.group({
      Codigo: ['', Validators.required],
      Nombre: ['',Validators.required],
      Descripcion: [''],
      EsTransversal : false,
      Version: [''],
      TipoDocumentoId: ['',Validators.required],
      FechaEmision: [],
      FechaIngreso: [],
      Archivo: [],
      DestinoDocumentoId: []
    })
  }


  listarAreas(){
    this._areaService.listar()
      .subscribe( result => { 
        this.dataSource = new MatTableDataSource(result)
        this.listarAreasDocumento()
      })
  }


  listarDocumentoPorId(documentoId: any){
    
    this._documentoService.listarPorId(documentoId)
    .subscribe(result => {
      this.formDocumento.patchValue(result);
    })
  }


  listarAreasDocumento(){
    if(this.documentoId){
      this._documentoService.listarAreasDocumento(this.documentoId)
        .subscribe(result => {
          result.forEach(area => {
              this.dataSource.data.forEach(row => { 
                if(JSON.stringify(row) === JSON.stringify(area)){
                  this.selection.select(row)
                }
              })
            })
        })
    }
  }


  listarDestinoDocumento(){
    this._destinoDocumentoService.listar()
      .subscribe(
        result => {
          this.listadoDestinoDocumento = result;
        },
        error => {
          console.error(error);
        }
      )
  }


  listarTipoDocumento(){
    this._tipoDocumentoService.listar()
      .subscribe(
        result => {
          this.listadoTipoDocumento = result
        },
        error => {
          console.error(error)
        }
      )

  }

  get f() { return this.formDocumento.controls; }


  onFileSelect(event) {
    if(event.target.files.length > 0){
      let file = event.target.files[0]
      this.fileToUpload = event.target.files[0]
    }
  }


  onSubmit(){
    const mensaje = '¿Estás seguro de que deseas actualizar el documento?';

    if (this._documentoService.confirmar(mensaje)) {

      const formData = new FormData(); 
      if(this.fileToUpload){
        formData.append('Archivo', this.fileToUpload , this.fileToUpload.name )
      }
      formData.append('Id', this.documentoId)
      formData.append('Codigo', this.formDocumento.get('Codigo').value)
      formData.append('Nombre', this.formDocumento.get('Nombre').value)
      formData.append('Descripcion', this.formDocumento.get('Descripcion').value)
      formData.append('Version', this.formDocumento.get('Version').value)
      formData.append('TipoDocumentoId', this.formDocumento.get('TipoDocumentoId').value)
      formData.append('FechaEmision', this.formDocumento.get('FechaEmision').value)
      formData.append('FechaIngreso', this.formDocumento.get('FechaIngreso').value)
      formData.append('DestinoDocumentoId', this.formDocumento.get('DestinoDocumentoId').value)

      this._documentoService.editar(formData)
      .subscribe(result => {  })
    }

  }

  cambiarEstado(){
    this.listarAreas()
  }


  asociarDocumentoArea(){
    let input = new FormData();

    let areas = this.selection.selected;
    input.append('documentoId', this._activatedRoute.snapshot.paramMap.get("Id"))
    input.append("areas", JSON.stringify(areas)) 
    
    this._documentoService.actualizarDocumentoArea(input)
    .subscribe( 
        result => {
          alert(JSON.stringify(result))
          this.resetearFormulario()
        },
        error => {
          alert(JSON.stringify(error))
        }
    )
  }

  resetearFormulario(){
    this.formDocumento.reset();
    this.selection = null
  }


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  
  }

}
