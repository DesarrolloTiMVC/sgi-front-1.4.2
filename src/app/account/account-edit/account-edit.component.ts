import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Area } from 'src/app/area/area';
import { Role } from 'src/app/role/role';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material';
import { AreaService } from 'src/app/services/area.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  public formUsuario: FormGroup
  public auxUsuario: Account
  public submitted = false 
  public listadoAreas: Area[]
  public listadoRoles: Role[]
  public IdUsuarioGuardado: string
  public areasUsuario: Area[]
  tituloColumnas = ['Seleccionar','Nombre']
  selection = new SelectionModel<Area>(true, []);
  dataSource: MatTableDataSource<Area> 

  constructor(
    private formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _activatedRoute: ActivatedRoute,
    private _areasService: AreaService,
    private _roleService: RoleService,
    ) { }

  ngOnInit() {
    this.buildForm()
    this.listarAreas()
    this.listarRoles()
    this.llenarFormulario()
    console.log(localStorage)
  }

  buildForm(){
    this.formUsuario = this.formBuilder.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Email: ['', Validators.email ],
      PhoneNumber:  [],
      UserName: ['', Validators.required ],
      Password: [null],
      RoleId: [''],
      Level: 1, 
      JoinDate: new Date,
    });
  }


  onSubmit(){
    let userId = this._activatedRoute.snapshot.params['Id']
    this._accountService.actualizar(userId, this.formUsuario.value).subscribe(
      result => {
          alert("Usuario Actualizado")
      },
      error => {

      }

    )


  }

  asociarUsuarioArea(){
    let input = new FormData();
    let areas = this.selection.selected; 
    let idUsuario = this.formUsuario.controls["UserName"].value

    if(!idUsuario){
        console.log("no hay usuario para asignarle los datos")
    }

    input.append('ApplicationUserId', idUsuario)
    input.append("areas", JSON.stringify(areas)) 

    this._accountService.actualizarAsociacionUsuarioArea(idUsuario, input)
    .subscribe(
      result => {
        alert("Areas guardados")
      },
      error => {
        alert(JSON.stringify(error))
      }
    )

  }

  get f() { return this.formUsuario.controls; }

  listarRoles(){
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

  llenarFormulario(){
    let userId = this._activatedRoute.snapshot.paramMap.get("Id")
    this._accountService.listarPorId(userId)
    .subscribe(result => {
      this.formUsuario.patchValue(result);   
      this.formUsuario.controls['RoleId'].patchValue(result.RoleId) 
    })
  }


  listarAreas(){
    this._areasService.listar()
    .subscribe(result => {
      this.dataSource = new MatTableDataSource(result)
      if(result.length > 0){
        this.listarAreasUsuario(this._activatedRoute.snapshot.paramMap.get("Id"))
      }
    })

  }

  /**
   * Recorre la tabla de áreas para seleccionar las áreas que tiene asignadas el usuario
   * @param usuarioId id del usuario
   */
  private listarAreasUsuario(usuarioId: any){
    this._areasService.listarAreasUsuario(usuarioId)
    .subscribe(result => 
      result.forEach(_data => {
        this.dataSource.data.forEach(row => { 
          if(JSON.stringify(row) === JSON.stringify(_data)){
            this.selection.select(row);
          }
        })
      })
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
}
