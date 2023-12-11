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
import { AccountEditComponent } from './account-edit.component';

describe('Crear account component test', () => {

  let component: AccountEditComponent;
  let fixture: ComponentFixture<AccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AccountEditComponent],
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
    fixture = TestBed.createComponent(AccountEditComponent);
  }));

  
  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(AccountEditComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it('Debería tener un tíutlo H1', ()=>{
    const fixture = TestBed.createComponent(AccountEditComponent)
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Editar usuario'
    );
  });

});
