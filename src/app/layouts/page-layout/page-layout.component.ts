import { Component, OnInit,ViewChild } from '@angular/core';
import { Area } from 'src/app/area/area';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { DestinoDocumentoService } from 'src/app/services/destino-documento.service';
import { DestinoDocumento } from 'src/app/destino-documento/destino-documento';
import { filter, map } from 'rxjs/operators';
import { JoyrideService } from 'ngx-joyride';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayoutComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  title = 'Angular';
  areas: Area[]
  destinosDocumentos: DestinoDocumento[]
  currentUser: Account; 
  documentosEstructurales: any[]
  rolUsuario: string;
  destinosPrimarios = []
  destinosSecundarios = []
  
  constructor(
    private _router: Router,
    private _accountService: AccountService,
    private _destinoDocumentoService: DestinoDocumentoService,
    private _cookieService: CookieService
  ) { 
    
  }


  ngOnInit() {
    var usuario = localStorage.getItem('user')
    var role = localStorage.getItem('role')
    this.areas = JSON.parse(localStorage.getItem('areas'))
    if(usuario){
      this.rolUsuario = role
      this.separarMenus()
    }
    this.areas = this.areas.filter(ar => ar.Estado != false)
  }

  /**
   * 
   */
  separarMenus(){
    //this.documentosEstructurales = this.destinos.filter(x => x.Id <= 8)
    this._destinoDocumentoService.listar()
    .pipe(
      map(result => { return result.filter(data => data.Estado == true) }))
    .subscribe(
      result=>{
        this.destinosPrimarios = result.filter(data => data.Item == 'da').sort((a,b) => a.Nombre.localeCompare(b.Nombre))
        this.destinosSecundarios = result.filter(y => y.Item == "md").filter(item => item.Nombre != 'Documentos por área' ).sort((a,b) => a.Nombre.localeCompare(b.Nombre))
      },
      error=>{
        console.error(error)
      }
    )
  }

  

  /**
   * 
   */
  cerrarSesion(){
    localStorage.clear();
    this._accountService.logOut();
    this._router.navigate(['']);
    
  }
}
