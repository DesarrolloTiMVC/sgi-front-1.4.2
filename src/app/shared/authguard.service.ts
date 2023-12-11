import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate
{
  constructor(private _router: Router) { }

  canActivate() {
    const jwtHelper = new JwtHelperService();
    let tokenParam = JSON.parse(localStorage['user'])

    //verificar  si el localstorage contiene data
    if(localStorage === null)
    {
      // console.log("No storage data")
      localStorage.clear();
      this._router.navigate(['/']);
    }

    //verificar si el token expiró
    if(jwtHelper.isTokenExpired(tokenParam['Token']))
    {
      // console.log("Token vencido")
      localStorage.clear();
      this._router.navigate(['/']);
    }
    return true;
  }
}
