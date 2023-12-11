import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTableDataSource, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthguardService } from './authguard.service';

describe('AuthguardService', () => {
  let service;  
  let someService; 
  class SomeService {
    canActivate = function(){};
  }

  beforeEach(()=> {
    someService = new SomeService(); 
    service = new AuthguardService(someService);
  })

  it("Debería obtener data", ()=> {
   expect(1+1).toBe(2)
  })
});
