import { Component, OnInit, ViewChild } from '@angular/core';
import { Documento } from '../documentos/documento';
import { DocumentoService } from '../services/documento.service';
import { filter, map, mergeAll, mergeMap, pluck, tap } from 'rxjs/operators';
import { AreaService } from '../services/area.service';
import { Area } from '../area/area';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { MatSnackBar} from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatInputModule, MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DestinoDocumentoService } from '../services/destino-documento.service';


@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  public listadoDocumentos: Documento[]
  public listadoAreas: Area[] 
  tituloColumnas: string[] = ['Codigo','Nombre', 'Descripción', 'Versión','Descargar']
  public formData: FormGroup
  usuario: any
  title: string
  Role: string
  dataSource: MatTableDataSource<Documento>;
  TipoDocumento = [
    {"Id": 21 , "Nombre": "Documentos", "Descripcion": ""},
    {"Id": 22 , "Nombre": "Registros", "Descripcion": ""}
  ]

 
  constructor(
    private _documentoService: DocumentoService,
    private _areaService: AreaService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar, 
    private _sanitizer: DomSanitizer,
    private _matInput: MatInputModule,
    private formBuilder: FormBuilder,
    private _destinoDocumentoService: DestinoDocumentoService
  ) { 
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
    this.verificarUsuario()
    this.inicializaFormulario()
    

    this.formData.get('filtro').valueChanges.subscribe((change) => {
      change == '' ? this.verificarUsuario() : this.applyFilter(change)
    });
    //this.dataSource.paginator = this.paginator
    
    this.setTituloPagina()
  }

  
  verificarUsuario(){
    this.usuario = JSON.parse(localStorage.getItem("user"));
    this.Role = localStorage.getItem('role')
    this.listarDocumentos();
    return; 
  }


  inicializaFormulario(){
    this.formData = this.formBuilder.group({
      filtro: [''],
      TipoDocumentoId: ['']
    });
  }

  
  /**
   * Lista todos los documentos en el sistema
   */
  listarDocumentos(){
    //Separación y filtrado 
    // si como parámetro viene las áreas del usuario se filtra si aplican 
    const urlParams = this._router.url; 
    if(urlParams.includes("de")){
      if(this._activatedRoute.snapshot.params.IdArea){
        this.listarDocumentosPorArea(this._activatedRoute.snapshot.params.IdArea)
        return;
      }else{
        this.listarDocumentoPorDestino(this._activatedRoute.snapshot.params.Id)
        return;
      }
    }

    if(urlParams.includes("do")){
      this.listarDocumentoPorArea(this._activatedRoute.snapshot.params.Id)
      return;
    }

    this._documentoService.listar()
      .subscribe(result => {
        result = result.sort((a,b) => new Date(b.FechaIngreso).getTime() - new Date(a.FechaIngreso).getTime())
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator
      })
  }

  setTituloPagina(){
    let sectionId = this._activatedRoute.snapshot.params.Id
    if (typeof sectionId === 'undefined'){
      this.title = 'Biblioteca Documental'
      return
    }

    let id = this._activatedRoute.snapshot.paramMap.get('Id')
    let idArea = this._activatedRoute.snapshot.paramMap.get('IdArea')

    if(idArea == null){
      this._destinoDocumentoService.listarPorId(this._activatedRoute.snapshot.params.Id).subscribe(
        result => {
            this.title = result.Nombre
        },
        error => {
          console.error(error)
        }
      )
    }
    else{
      this._areaService.listarPorId(+idArea).subscribe(
        result => {
          this.title = "Documentos " + result.Nombre
        },
        error => {

        }
      )
    }
  }


  listarDocumentoPorDestino(idDestino){
    this._documentoService.listar()
    .pipe(
      map(result => {
        //Ordenados por fecha de mayor a menor (documentos más viejos al último)
        result = result.sort((a,b) => new Date(b.FechaIngreso).getTime() - new Date(a.FechaIngreso).getTime())
        return result.filter(doc => doc.DestinoDocumentoId == idDestino)
      })
    )
    .subscribe(result => {
      this.dataSource = new MatTableDataSource(result)
      this.dataSource.paginator = this.paginator
    })
  }


  listarDocumentosPorArea(idArea){
    this._documentoService.listar()
    .pipe(
      map(result => {
        //Ordenados por fecha de mayor a menor (documentos más viejos al último)
        result = result.sort((a,b) => new Date(b.FechaIngreso).getTime() - new Date(a.FechaIngreso).getTime())
        return result.filter(doc => doc.Areas.some(ar => ar.Id == idArea))
      })
    )
    .subscribe(result => {
      this.dataSource = new MatTableDataSource(result)
      this.dataSource.paginator = this.paginator
    })

  }


  /**
   * Descargar el documento seleccionado
   * @param e 
   */
  descargar(e){
    this._documentoService.descargarDocumento(e.Id)
      .subscribe(data =>{
        let extension = this.listarExtensionPorMime(data.type)
        let type = data.type;
        var blob = new Blob([data], { type: type  })
        saveAs(blob, e.Codigo + extension);
      })
  }
  
  
  /** Remover esto es solo para las pruebas */
  listarAreas(){
    this._areaService.listar()
    .subscribe(result => {
      this.listadoAreas = result 
    } )
  }


  /**
   * Lista los documentos que se asocian a un área cuando se suben 
   * @param areas Array del objeto tipo área
   */
  listarDocumentoPorAreas(areas: Area[]){
    this._documentoService.listarPorArea(areas)
    .subscribe(result => {
      this.listadoDocumentos = result 
    })
  }


  /**
   * Lista los documentos asociados a UN AREA la cual se define por el Id
   * @param areaId Id del área
   */
  listarDocumentoPorArea(areaId: number){
    let usuario = JSON.parse(localStorage.getItem("user"));
    let areas = usuario.Areas
    this._documentoService.listarPorArea(areas)
    .pipe(
      map(result => { 
        result = result.sort((a,b) => new Date(b.FechaIngreso).getTime() - new Date(a.FechaIngreso).getTime())
        return result.filter(doc => doc.Areas.some( ar => ar.Id == areaId)) 
      })
    )
    .subscribe(result => {
      this.listadoDocumentos = result 
    })
  }


  /**
   * Aplica filtro básandose en el texto ingresado en el input de arriba de la tabla
   * @param filterValue 
   */
  applyFilter(filterValue: string){

    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.paginator = this.paginator
  }


  editar(elemento: any){
    this._router.navigate(["app/documento/editar/", elemento.Id])
  }

  eliminar(elemento: any){
    this._documentoService.eliminar(elemento).subscribe(result => {
      alert(result);
      this.verificarUsuario()
    })
  }


  /***
   * Redirige a la página para agregar un nuevo documento 
   */
  agregarDocumento(){
    //this._router.navigate(['documento/crear'])
    this._router.navigateByUrl("app/documento/crear").then( e =>{})
  }

  filtrarPorTipoDocumento(listadoTipoDocumentos: Documento[], tipoDocumentoId: number){
    this._documentoService.listar().pipe(
      map(data => data.filter(doc => doc.TipoDocumentoId == tipoDocumentoId ))
    ).subscribe(result =>{ 
        this.listadoDocumentos = result
    })
  }

  listarExtensionPorMime(mime: string){
    const listadoMime = [
      {"extension": ".pdf" , "mime": "application/pdf" },
      {"extension": ".xls" , "mime": "application/vnd.ms-excel" },
      {"extension": ".xlsx", "mime": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
      {"extension": ".ppt" , "mime": "application/vnd.ms-powerpoint" },
      {"extension": ".pptx", "mime": "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
      {"extension": ".doc" , "mime": "application/msword" },
      {"extension": ".docx", "mime": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
      {"extension": ".txt", "mime": "text/plain" }
    ]

    return listadoMime.filter(x => x.mime == mime)[0].extension;
  }


  filtrarDocumentos(){
    const areaId = this._activatedRoute.snapshot.params["Id"]
    const tipoDocumentoId = this.formData.get('TipoDocumentoId').value

    const datos = this._documentoService.listar()

    if(areaId && tipoDocumentoId){
      datos.pipe(
        map(data => data.filter(doc => doc.AreaId == areaId && doc.TipoDocumentoId == tipoDocumentoId))
      )
      .subscribe(result => {
        this.listadoDocumentos = result;  
      });
    }

  }
}