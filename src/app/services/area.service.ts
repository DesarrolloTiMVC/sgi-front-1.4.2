import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Area } from '../area/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = environment.apiUrl;
  
  constructor(private _http: HttpClient) {}


  /**
   * Lista todas las áreas
   */
  listar(){
    return this._http.get<Area[]>(this.apiUrl + "area")
  }


  /**
   * Lista el área asociada a un Id
   * @param Id Id del área
   */
  listarPorId(Id: number){
    return this._http.get<Area>(this.apiUrl +"/area/" +Id)
  }


  /**
   * Lista las áreas asociadas a un nombre
   * @param nombre nombre del área consultada
   */
  listarPorNombre(nombre: string){
    return this._http.get<Area[]>(this.apiUrl + "/area/" + nombre)
  }

  listarAreasUsuario(idUsuario: string){
    return this._http.get<Area[]>(this.apiUrl + "/area/poridusuario/" + idUsuario)
  }

  
}
