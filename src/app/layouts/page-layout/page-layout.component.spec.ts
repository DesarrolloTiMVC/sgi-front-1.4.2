/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatSidenavModule, MatListModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageLayoutComponent } from './page-layout.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AreaService } from 'src/app/services/area.service';
import { ListadoAreasComponent } from 'src/app/components/listado-areas/listado-areas/listado-areas.component';

describe('PageLayoutComponent', () => {

  let component: PageLayoutComponent;
  let fixture: ComponentFixture<PageLayoutComponent>;
  let de: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [PageLayoutComponent, ListadoAreasComponent ],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatCheckboxModule,
          MatDatepickerModule,
          MatSidenavModule,
          MatExpansionModule,
          MatListModule,
          BrowserAnimationsModule,
          RouterTestingModule
        ]
    })
    .compileComponents();

    let fixture = TestBed.createComponent(PageLayoutComponent);
    let comp = fixture.componentInstance;
  }));

  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(PageLayoutComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  
});
