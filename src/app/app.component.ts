import { Component, OnInit } from '@angular/core';
import { Area } from './area/area';
import { Account } from './account/account';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Angular';
  areas: Area[]
  currentUser: Account; 
  documentosEstructurales: any[]
  otrosDestinos: any[]
  enabled = true;

  destinos = [
      { "Id": 2, "Nombre": "Auditorías" },
      { "Id": 3, "Nombre": "No Conformidades" },
      { "Id": 4, "Nombre": "Gestión Emergencias" },
      { "Id": 5, "Nombre": "Documentos Transversales" },
      { "Id": 6, "Nombre": "Manual Sistema Gestión Integrado (SGI)" },
      { "Id": 7, "Nombre": "Política Corporativa MVC" },
      { "Id": 8, "Nombre": "Notas Internas" },
      { "Id": 9, "Nombre": "Formatos en blanco" },
      { "Id": 10, "Nombre": "Documentos EE.CC." }
  ]


  constructor(
    private _router: Router,
    private _accountService: AccountService
  ){
    //this._accountService.currentUser.subscribe( x => this.currentUser = x);
    
  }

  ngOnInit(){

    if(this.currentUser){
      this.areas = this.currentUser.Areas;
      localStorage.setItem("UserRole", this.currentUser.Role) 
    }

    this.separarMenus()
  }

  cerrarSesion() {
    this._accountService.logOut();
    this._router.navigate(['/'])
    localStorage.clear();
  }

  separarMenus(){
    this.documentosEstructurales = this.destinos.filter(x => x.Id <= 8)
    this.otrosDestinos = this.destinos.filter(x => x.Id > 8)
  }
}
