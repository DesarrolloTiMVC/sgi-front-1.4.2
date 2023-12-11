import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DestinoDocumento } from '../destino-documento/destino-documento';

@Injectable({
  providedIn: 'root'
})
export class DestinoDocumentoService {

  apiUrl: string = environment.apiUrl
  
  constructor(private _httpClient: HttpClient) { 
  }

  public guardar(){}
  public editar(){}
  public eliminar(){}

  public listar(){
    return this._httpClient.get<DestinoDocumento[]>(this.apiUrl +"destinodocumento")
  }

  public listarPorId(Id: any){
    return this._httpClient.get<DestinoDocumento>(this.apiUrl +"destinodocumento/" + Id)
  }
}
