import { Roles } from "./enum/roles.enum";
import { Specialties } from "./enum/specialties.enum";

export class Specialist {
    name:string;
    lastname:string;
    age?:number;
    dni?:number;
    specialty?:Specialties;
    mail:string;
    password:string;
    active:boolean;
    role:Roles;
    image:string;

    constructor() {
        this.name = "";
        this.lastname = "";
        this.mail = "";
        this.password = "";
        this.active = false;
        this.role = Roles.SPECIALIST;
        this.image = "";
    }
}
