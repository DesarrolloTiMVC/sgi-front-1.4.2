import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService} from '../../services/account.service'
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Account } from '../account'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  tituloColumnas: string[] = ['Id', 'FirstName', 'LastName', 'UserName','Acciones']
  dataSource: MatTableDataSource<Account>
  public formData: FormGroup
  Role: string
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
          private _accountService: AccountService,
          private _router: Router,
          private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.listarDataUsuarios()
    this.inicializaFormulario()

    this.formData.get('filtro').valueChanges.subscribe((change) => {
      change == '' ? this.listarDataUsuarios() : this.applyFilter(change)
    });
    
  }

  inicializaFormulario(){
    this.formData = this.formBuilder.group({
      filtro: [''],
      TipoDocumentoId: ['']
    });
  }
  

  listarDataUsuarios(){
    this.Role = localStorage.getItem('role')
    this._accountService.listarDataUsuarios()
      .subscribe(
        result => {
          this.dataSource = new MatTableDataSource(result)
        },
        error => {
          console.log(error);
        })
  }

  listarData () {
    return this._accountService.listarDataUsuarios()
    .subscribe(result => {
      this.dataSource = new MatTableDataSource(result)
    })
    
  }



  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  editarData(row: any){
    this._router.navigate(["app/account/editar/", row.Id])
  }

  eliminarData(row: any){

    this._accountService.eliminar(row.Id)
    .subscribe(result => {
      alert(result)
      this.listarDataUsuarios()
    })
  }

  agregarUsuario(){
    this._router.navigate(["app/account/crear"])
  }
}
