import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { inject, TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountEditComponent } from '../account/account-edit/account-edit.component';
import { Account } from '../account/account';


describe('AccountService', () => {

  let injector: TestBed; 
  let httpMock: HttpClientModule; 

  const http = {
    get: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [AccountService]
    })
    injector = getTestBed(); 
    httpMock = injector.get(HttpClientModule);
  });

  afterEach(() => jest.resetAllMocks());

  it('Debería listar a los usaurios', async ()=>{
    const srv: AccountService  = TestBed.get(AccountService);
    srv.listar().subscribe(result => {
      console.log(result.length);
      expect(result.length).toBe(1);
    })
  });

  it('Debería calcular', ()=>{
    expect(1).toBe(1);
  });
  
});
