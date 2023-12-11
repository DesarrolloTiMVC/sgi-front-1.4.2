import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentosCreateComponent } from './documentos/documentos-create/documentos-create.component';
import { AppComponent } from './app.component';
import { AreaComponent } from './area/area.component';
import { AreaCreateComponent } from './area/area-create/area-create.component';
import { AreaEditComponent } from './area/area-edit/area-edit.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { LoginComponent } from './login/login.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { DocumentoListComponent } from './documentos/documento-list/documento-list.component';
import { DocumentoEditComponent } from './documentos/documento-edit/documento-edit.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { AccountComponent } from './account/account/account.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { AuthguardService } from './shared/authguard.service';


const routes: Routes = [
  {
    path: '', component: LoginLayoutComponent,  pathMatch: 'prefix',
    children: [
      { path: '', component: LoginComponent },
    ]
  },
 { 
    path:'app',
    component: PageLayoutComponent,
    children: [
      // inicio
      { path:'inicio', component: InicioComponent },
      //
      { path:'documento', component: DocumentosComponent },
      { path:'documento/crear', component: DocumentosCreateComponent,canActivate: [AuthguardService]  },
      { path:'documento/editar/:Id', component: DocumentoEditComponent, canActivate: [AuthguardService]  },
      //areas
      { path:'area', component: AreaComponent, canActivate: [AuthguardService]  },
      { path:'area/crear', component: AreaCreateComponent, canActivate: [AuthguardService] },
      { path:'area/editar/:Id', component: AreaEditComponent, canActivate: [AuthguardService]  },
      //account
      { path:'account', component: AccountComponent, canActivate: [AuthguardService] },
      { path:'account/crear', component: AccountCreateComponent},
      { path:'account/editar/:Id', component: AccountEditComponent },
      //biblioteca
      { path: 'biblioteca', component: BibliotecaComponent },
      { path: 'biblioteca/:Id', component: BibliotecaComponent },
      { path: 'biblioteca/de/:Id', component: BibliotecaComponent },
      { path: 'biblioteca/de/:Id/:IdArea', component: BibliotecaComponent },
      { path: 'biblioteca/do/:Id', component: BibliotecaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }