import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { inject, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from './loader.service';


describe('AccountService', () => {
  let service: LoaderService;
  let backend: HttpTestingController

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ], 
      providers: [LoaderService]
    });

    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(LoaderService)

    // Mock implementation of console.error to
    // return undefined to stop printing out to console log during test
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  });

  afterEach(inject([ HttpTestingController ], (_backend: HttpTestingController) => {
    _backend.verify()
  }))
 
  it('should create an instance successfully', () => {
    expect(service).toBeDefined()
  })

});
