import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DocumentosCreateComponent } from './documentos/documentos-create/documentos-create.component';
import { DocumentosComponent} from '../app/documentos/documentos.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { AreaComponent } from './area/area.component';
import { AreaCreateComponent } from './area/area-create/area-create.component';
import { AreaEditComponent } from './area/area-edit/area-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CookieService } from 'ngx-cookie-service';

import { 
  MatIconModule, 
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatInputModule, 
  MatFormFieldModule,
  MatSelectModule,
  MAT_DATE_LOCALE, 
  MatSlideToggleModule,
  MatCardModule
} from '@angular/material';

import {MatToolbarModule} from '@angular/material/toolbar';

//import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';

import { FormsModule } from '@angular/forms';
import { RoleCreateComponent } from './account/role-create/role-create.component';
import { RoleEditComponent } from './account/role-edit/role-edit.component';
import { DocumentoListComponent } from './documentos/documento-list/documento-list.component';
import { DocumentoEditComponent } from './documentos/documento-edit/documento-edit.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { NotifierModule } from "angular-notifier";
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AccountComponent } from './account/account/account.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { JoyrideModule } from 'ngx-joyride'
import { from } from 'rxjs';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { ListadoAreasComponent } from './components/listado-areas/listado-areas/listado-areas.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentosCreateComponent,
    DocumentosComponent,
    AccountCreateComponent,
    AreaComponent,
    AreaCreateComponent,
    AreaEditComponent,
    BibliotecaComponent,
    RoleCreateComponent,
    RoleEditComponent,
    DocumentoListComponent,
    DocumentoEditComponent,
    PageLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    AccountComponent,
    AccountEditComponent,
    InicioComponent,
    ListadoAreasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    //MatTableExporterModule por implementar,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional)
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    LayoutModule,
    NotifierModule.withConfig({
      // Custom options in here
      }),
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    JoyrideModule.forRoot(),
  ],
  exports: [
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    CookieService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
