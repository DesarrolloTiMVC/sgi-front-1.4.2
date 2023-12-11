/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatCheckboxModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/services/account.service';
import { RoleCreateComponent } from './role-create.component';


describe('Crear account component test', () => {

  let component: RoleCreateComponent;
  let fixture: ComponentFixture<RoleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [RoleCreateComponent],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatCheckboxModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();
    fixture = TestBed.createComponent(RoleCreateComponent);
  }));

  
  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(RoleCreateComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it('Debería tener un tíutlo H1', ()=>{
    const fixture = TestBed.createComponent(RoleCreateComponent)
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Crear rol'
    );
  });

});
