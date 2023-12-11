import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../role/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl: string = environment.apiUrl
  
  constructor(private _http: HttpClient) { }

  listar(){
    return this._http.get<Role[]>(this.apiUrl +"role")
  }

  listarPorId(Id: number){
    return this._http.get<Role[]>(this.apiUrl +"role/" + Id  )
  }

}
