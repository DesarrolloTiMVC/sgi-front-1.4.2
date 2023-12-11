import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TipoDocumento } from '../tipo-documento/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  apiUrl: string = environment.apiUrl
  
  constructor(private _httpClient: HttpClient) { }

  guardar(tipoDocumento: any){
    return this._httpClient.post<any>(this.apiUrl + "tipodocumento", tipoDocumento)
  }

  editar(tipoDocumento: any){
    return this._httpClient.put<any>(this.apiUrl + "tipodocumento", tipoDocumento)
  }
  
  eliminar(tipoDocumento: any){
    return this._httpClient.delete<any>(this.apiUrl +"tipodocumento/" + tipoDocumento.Id)
  }
  
  /**
   * Muestra todos los documentos del sistema
   */
  listar(){
    return this._httpClient.get<TipoDocumento[]>(this.apiUrl +"tipodocumento")
  }

  /**
   * Muestra un documento con el Id pasado por parámetro
   * @param id Id del documento
   */
  listarPorId(id: any){
    return this._httpClient.get<TipoDocumento>(this.apiUrl +"tipodocumento/"+ id)
  }


  /**
   * Retorna el documento asociado al código
   * @param codigo Código del documento
   */
  listarPorCodigo(codigo: string){
   
  }

}
