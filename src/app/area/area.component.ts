import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AreaService } from '../services/area.service';
import { Area } from './area';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  listadoAreas: Area[]
  tituloColumnas : string[]

  constructor(private _areaService: AreaService) { }

  ngOnInit() {
    
    this.listarAreas()
    this.tituloTabla();
  }

  listarAreas(){
    this._areaService.listar()
    .subscribe(result => {
      console.log(result)
      this.listadoAreas = result
    })
  }

  tituloTabla(){
    this.tituloColumnas = ["Id","Nombre","Descripcion","Acciones"]
  }

  editarData(element: any){
    console.log(element)
    return false;
  }

  eliminarData(element: any){
    confirm("Confirmar eliminación de: " + element.Nombre);
    return false;
  }

}
