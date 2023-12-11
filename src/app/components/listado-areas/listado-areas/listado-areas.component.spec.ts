import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpandOperator } from 'rxjs/internal/operators/expand';

import { ListadoAreasComponent } from './listado-areas.component';

describe('ListadoAreasComponent', () => {
  let component: ListadoAreasComponent;
  let fixture: ComponentFixture<ListadoAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAreasComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
       ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ListadoAreasComponent);
    component = fixture.componentInstance;
  }));

  
  it('should create', () => {
    const fixture = TestBed.createComponent(ListadoAreasComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should read the areas according to userId', ()=>{
    

  });

});
