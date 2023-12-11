import { Area } from '../area/area'
import { DocumentoAreas } from './documento-areas'

export class Documento {
    Id: number
    Codigo: string
    Nombre: string 
    Descripcion: string
    Direccion: string
    Version: string
    Archivo: File
    AreaId: number
    DestinoDocumentoId: number
    TipoDocumentoId?: number
    FechaEmision: Date
    FechaIngreso: Date
    Areas: Area[]
}
