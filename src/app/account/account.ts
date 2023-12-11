import { Area } from '../area/area'

export class Account {
    Id: string
    FirstName: string
    LastName: string
    Email: string
    PhoneNumber?: string
    UserName: string
    Password?:string
    ConfirmPassword?: string
    Areas: Area[]
    Role: string
    RoleId: string
    RoleName: string
}
