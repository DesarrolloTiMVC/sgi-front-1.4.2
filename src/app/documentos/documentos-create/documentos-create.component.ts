import { Component, OnInit } from '@angular/core';
import { Documento } from '../documento'
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/area/area';
import { SelectionModel } from '@angular/cdk/collections';
import { DocumentoService } from 'src/app/services/documento.service';
import { Router } from '@angular/router';
import { matFormFieldAnimations, MatSnackBar } from '@angular/material';
import { DestinoDocumentoService } from 'src/app/services/destino-documento.service';
import { DestinoDocumento } from 'src/app/destino-documento/destino-documento';
import { TipoDocumento } from 'src/app/tipo-documento/tipo-documento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-documentos-create',
  templateUrl: './documentos-create.component.html',
  styleUrls: ['./documentos-create.component.css']
})


export class DocumentosCreateComponent implements OnInit {
 
  public formDocumento: FormGroup
  public submitted = false
  public listadoAreas: Area[]
  insertDocumento = new Documento
  public paso1 = true; 
  public paso2 = false;
  //public documentoGuardado: Documento
  documentoGuardadoId: any
  
  fileToUpload: File = null
  selection = new SelectionModel<Area>(true, []);

  listadoTipoDocumento: TipoDocumento[];
  listadoDestinoDocumento : DestinoDocumento[];
  tituloColumnas = ['Seleccionar','Nombre','Descripcion']
  nombre = 'DocumentosCreate'
  
  
  constructor( 
    private formBuilder: FormBuilder,
    private _areaService: AreaService,
    private _documentoService: DocumentoService,
    private _router: Router,
    private _matSnack: MatSnackBar,
    private _destinoDocumentoService: DestinoDocumentoService,
    private _tipoDocumentoService: TipoDocumentoService
    ) { 
  }
  

  ngOnInit() {
   this.buildForm()
   this.listarAreas()
   this.listarDestinoDocumento()
   this.listarTipoDocumento()
  }


  private buildForm(){
    this.formDocumento = this.formBuilder.group({
      Codigo: ['', Validators.required],
      Nombre: ['',Validators.required],
      Descripcion: [''],
      EsTransversal : false,
      Version: [''],
      TipoDocumentoId: ['',Validators.required],
      FechaEmision: new Date,
      FechaIngreso: new Date,
      Archivo: [],
      DestinoDocumentoId: []
    })
  }


  listarAreas(){
    this._areaService.listar()
      .subscribe( result => { 
        this.listadoAreas = result
      })
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

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listadoAreas.forEach(row => this.selection.select(row));
  }


  isAllSelected() {
    if(this.selection.selected != []){
      const numSelected = this.selection.selected.length;
      const numRows = this.listadoAreas.length;
      return numSelected === numRows;
    }
  }


  onSubmit(){
    const mensaje = '¿Estás seguro de que deseas crear el documento?';

    if (this._documentoService.confirmar(mensaje)) {

      const formData = new FormData(); 
      formData.append('Archivo',  this.fileToUpload, this.fileToUpload.name)
      formData.append('Codigo', this.formDocumento.get('Codigo').value)
      formData.append('Nombre', this.formDocumento.get('Nombre').value)
      formData.append('Descripcion', this.formDocumento.get('Descripcion').value)
      formData.append('Version', this.formDocumento.get('Version').value)
      formData.append('TipoDocumentoId', this.formDocumento.get('TipoDocumentoId').value)
      formData.append('FechaEmision', this.formDocumento.get('FechaEmision').value)
      formData.append('FechaIngreso', this.formDocumento.get('FechaIngreso').value)
      formData.append('DestinoDocumentoId', this.formDocumento.get('DestinoDocumentoId').value)
      
          
      this._documentoService.guardar(formData)
      .subscribe(result => { 
        this._matSnack.open("Agregado con Id" + result, "",{
          duration: 5000
        } )
        this.documentoGuardadoId = result 
        this.cambiarVistas();
      },
      error =>{
        console.log(error);
      })
    }
  }
  

  cambiarEstado(){
    this.cambiarVistas()
    this.listarAreas()
  }


  asociarDocumentoArea(){
    let input = new FormData();
    let areas = this.selection.selected;
    if(!this.documentoGuardadoId || this.documentoGuardadoId == 0){
      alert("Error no se ha registrado el Id, favor verificar si se ingreso el documento \n si no realice la operación nuevamente")
      return
    }

    input.append('documentoId', this.documentoGuardadoId.toString())
    input.append("areas", JSON.stringify(areas)) 
    
    this._documentoService.asociarDocumentoArea(input)
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
    this.cambiarVistas()
    this.formDocumento.reset();
    this.selection = null
  }


  cambiarVistas(){
    this.paso1 = !this.paso1
    this.paso2 = !this.paso2
  }

  volverUsuario(){
    this._router.navigate(["app/account"])
  }
}
