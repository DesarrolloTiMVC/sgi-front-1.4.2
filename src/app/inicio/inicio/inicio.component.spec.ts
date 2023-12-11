import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTableDataSource, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { InicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioComponent ],
      imports: [
        MatTableModule,
        RouterTestingModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(1+1).toBe(2);
  });
});
