import { ObraSocial } from "./enum/obraSociales.enum";
import { Roles } from "./enum/roles.enum";

export class Patient {
    name:string;
    lastname:string;
    age?:number;
    dni?:number;
    obraSocial?:ObraSocial;
    mail:string;
    password:string;
    imgOne?:string;
    imgtwo?:string;
    role:Roles;

    constructor() {
        this.name = "";
        this.lastname = "";
        this.mail = "";
        this.password = "";
        this.role = Roles.PATIENT;
    }
}
