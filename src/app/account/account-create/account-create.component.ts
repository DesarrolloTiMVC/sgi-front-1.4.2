import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Area } from 'src/app/area/area';
import { Account } from '../account'
import { SelectionModel } from '@angular/cdk/collections';
import { Role } from 'src/app/role/role';
import { RoleService } from 'src/app/services/role.service';
import { MatTableDataSource } from '@angular/material';
 
@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  public formUsuario: FormGroup
  public auxUsuario: Account
  public submitted = false 
  public listadoAreas: Area[]
  public listadoRoles: Role[]
  public IdUsuarioGuardado: string
  
  selection = new SelectionModel<Area>(true, []);

  dataSource: MatTableDataSource<Area> 
  tituloColumnas = ['Seleccionar','Nombre']
  public paso1 = true
  public paso2 = false
  public title = 'my-awesome-app'

  
  constructor(
    private formBuilder: FormBuilder,
    private _areaService: AreaService,
    private _accountService: AccountService,
    private _roleService: RoleService) { }


  ngOnInit() {
    this.buildForm()
    this.listarAreas()
    this.listarRoles()
  }


  buildForm(){
    this.formUsuario = this.formBuilder.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Email: ['', Validators.email ],
      PhoneNumber:  [],
      UserName: ['', Validators.required ],
      Password: [null,[Validators.required,Validators.minLength(6)]],
      RoleId: [''],
      Level: 1, 
      JoinDate: new Date,
    });
  }


  listarAreas(){
    this._areaService.listar()
      .subscribe( result => { 
        this.dataSource = new MatTableDataSource(result) 
      })
  }

  listarRoles() {
    // Paso 1: Obtener la cadena JSON del localStorage
    var userString = localStorage.getItem('user');

    // Paso 2: Convertir la cadena JSON a un objeto JavaScript
    var userObject = JSON.parse(userString);

    // Paso 3: Acceder a la propiedad UserName dentro del objeto
    var userName = userObject.UserName;

    // Ahora 'userName' contiene el valor de la propiedad UserName
    console.log(userName);  

    if(userName=="administrador@mineravallecentral.cl") {
      this._roleService.listar()
      .subscribe(result => {
        this.listadoRoles = result;
      });
    } else {
      this._roleService.listar()
      .subscribe(result => {
        // Filtrar el resultado para excluir el rol con valor 1
        
        this.listadoRoles = result.filter(rol => rol.Id !== "1");
      });
    }
  }

  get f() { return this.formUsuario.controls; }
   
  onSubmit(){
    
    this.auxUsuario = this.formUsuario.value
    this._accountService.guardar(this.auxUsuario)
    .subscribe( 
      result => {
        this.IdUsuarioGuardado = this.formUsuario.controls['UserName'].value;
        localStorage.setItem("UserId",this.formUsuario.controls['UserName'].value);
        this.cambiarEstado()
        alert("usuario guardado")
       },
      error => { 
        console.log()
        alert(error.error.Message)
        return ;
      })
  }


  asociarUsuarioArea(){
    
    let input = new FormData();
    let areas = this.selection.selected; 
    if(!this.IdUsuarioGuardado){
        console.log("no hay usuario para asignarle los datos")
    }
    input.append('ApplicationUserId', this.IdUsuarioGuardado)
    input.append("areas", JSON.stringify(areas)) 

    this._accountService.asociarUsuarioArea(input)
    .subscribe(
      result => {
        alert("usuario y areas guardados")
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  cambiarEstado(){
    this.paso1 = false
    this.paso2 = true
    this.listarAreas()
  }
}
