/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/services/account.service';
import { AreaEditComponent } from './area-edit.component';

describe('AreaEditComponent', () => {

  let component: AreaEditComponent;
  let fixture: ComponentFixture<AreaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AreaEditComponent],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaEditComponent);
  }));

  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(AreaEditComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debería tener un tíutlo H1', ()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Editar área'
    );
  });

});
