import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Account } from '../account/account'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  _apiUrl: string  = environment.apiUrl;

  headers = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
  }
  
  constructor(private _http: HttpClient) {}

  guardar(account: Account){
    const _header = new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.post<string>(this._apiUrl + 'account/createUser/', account, { headers: _header}  )
  }

  
  actualizar(id: any, account: Account){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.put<Account>(this._apiUrl + "account/update/" + id, account, { headers: _header})
  }

  
  eliminar(id: any){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.delete<Account>(this._apiUrl + "account/delete/" + id, { headers: _header} )
  }

  
  listar(){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.get<Account[]>(this._apiUrl + "account" ,{ headers: _header})
  }

  
  listarPorId(id: any){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.get<Account>(this._apiUrl + "account/porid/" + id , { headers: _header})
  }


  listarPorNombreUsuario(userName: string){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.get<Account>(this._apiUrl + "account/pornombre/" + userName, { headers: _header} )
  }


  listarDataUsuarios(){
    //console.log(localStorage.getItem("token"))
    const _header = new HttpHeaders()
        .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.get<Account[]>(this._apiUrl + "account/listardatausuarios", { headers: _header })

  }


  asociarUsuarioArea(input: any){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.post(this._apiUrl + "account/asociarusuarioarea/" , input, { headers: _header})
  }

  actualizarAsociacionUsuarioArea(idUsuario: string, input: any){
    const _header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem("token"))
    return this._http.put(this._apiUrl + "account/actualizarasociacion/" + idUsuario , input, { headers: _header})
  }

  validateUser(formLogin: any){
    return this._http.post<any>(this._apiUrl + "account/signin", formLogin); 
  }

  logOut(){
    localStorage.clear();
  }

}
