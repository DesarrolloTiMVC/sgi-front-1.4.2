import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { inject, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { DocumentoService } from './documento.service';


describe('AccountService', () => {
  let service: DocumentoService;
  let backend: HttpTestingController

  const expectedDataAll = [{Id:2,Codigo:"r-002",Nombre:"Data",Descripcion:"adas",DestinoDocumentoId:1,Version:"1",TipoDocumentoId:2}]
  

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ], 
      providers: [DocumentoService]
    });

    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(DocumentoService)

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
