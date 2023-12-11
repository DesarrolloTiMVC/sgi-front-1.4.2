import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Documento } from '../documentos/documento';
import { environment } from 'src/environments/environment';
import { Area } from '../area/area';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  apiUrl: string = environment.apiUrl

  header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem("token") )
  }
  
  constructor(private _http: HttpClient) { }

  confirmar(mensaje: string): boolean {
    return window.confirm(mensaje);
  }

  guardar(documento: any){
    return this._http.post<any>(this.apiUrl + "documento", documento, this.header)
  }

  editar(documento: any){
    return this._http.put<Documento>(this.apiUrl + "documento", documento, this.header)
  }
  
  eliminar(documento: Documento){
    return this._http.delete<Documento>(this.apiUrl +"documento/" + documento.Id, this.header)
  }
  
  /**
   * Muestra todos los documentos del sistema
   */
  listar(){
    return this._http.get<Documento[]>(this.apiUrl +"documento", this.header)
  }

  /**
   * Muestra un documento con el Id pasado por parámetro
   * @param id Id del documento
   */
  listarPorId(id: any){
    return this._http.get<Documento>(this.apiUrl +"documento/"+ id, this.header)
  }


  /**
   * Retorna el documento asociado al código
   * @param codigo Código del documento
   */
  listarPorCodigo(codigo: string){
    return this._http.get<Documento>(this.apiUrl +"documento/"+ codigo, this.header)
  }


  /**
   * Guarda el documento y el área en la tabla de la base  de datos
   * @param formData 
   */
  asociarDocumentoArea(formData: any){
    return this._http.post(this.apiUrl + "documento/asociar", formData, this.header )
  }

  /**
   * Actualiza un documento y el área en la tabla de la base  de datos
   * @param formData 
   */
  actualizarDocumentoArea(formData: any){
    return this._http.put<any>(this.apiUrl + "documento/actualizarasociacion", formData, this.header )
  }


  /**
   * Lista por el array de areas que son pasadas por parámetro 
   * @param areas array de areas
   */
  listarPorArea(areas: Area[]){
    //agregar parámetros
    let httpParams = new HttpParams(); 
    httpParams = httpParams.append('areas', JSON.stringify(areas));
    return this._http.get<Documento[]>(this.apiUrl + "documento/porarea", {  params: httpParams , headers: new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem("token") )} )
  }


  descargarDocumento(Id: number){
    return this._http.get(this.apiUrl + "documento/descargar/"+ Id, {
      headers: ({
        Authorization: 'Bearer ' + localStorage.getItem("token"),
      })
      , responseType: 'blob' }); 
  }

  listarAreasDocumento(documentoId: any){
    return this._http.get<Area[]>(this.apiUrl + "documento/areas/"+ documentoId, this.header); 
  }
}
