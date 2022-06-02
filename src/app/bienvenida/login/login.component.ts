import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  listaAdmin: any = [];
  usuario = {
    email: '',
    password: '',
    role: ''
  };

  constructor(private database: DatabaseService,
    private router: Router,
    private toastService: ToastService,
    private SpinnerService: NgxSpinnerService) { }

  async ngOnInit() { 
    this.SpinnerService.show(); 
    const resPaciente = await this.database.traerTodo('pacientes');
    const resEspecialista = await this.database.traerTodo('especialistas');
    const resAdmin = await this.database.traerTodo('userAdmin');
    resPaciente?.subscribe((listaref: any) => {
      this.database.listaPaciente = listaref.map((userRef: any) => userRef.payload.doc.data());
      this.SpinnerService.hide(); 
    });
    resEspecialista?.subscribe((listaref: any) => {
      this.database.listaEspecialista = listaref.map((userRef: any) => userRef.payload.doc.data());
      this.SpinnerService.hide(); 
    });
    resAdmin?.subscribe((listaref: any) => {
      this.listaAdmin = listaref.map((userRef: any) => userRef.payload.doc.data());
      this.SpinnerService.hide(); 
    });
  }


  loginWithValidation() {
    let existePaciente=this.database.listaPaciente.find((email: any) => email.mail == this.user.email && email.password == this.user.password);
    let existeEspecialista=this.database.listaEspecialista.find((email: any) => email.mail == this.user.email && email.password == this.user.password);
    let existeAdmin= this.listaAdmin.find((email: any) => email.mail == this.user.email && email.password == this.user.password);
    if (existePaciente || existeEspecialista || existeAdmin) {
      try{
          this.database.onLogin(this.user.email, this.user.password).then(()=>{
          this.database.emailUsuarioLogeado = this.user.email;   
          this.database.role = this.user.role;
          this.router.navigate(['/home']);
          this.toastService.show("Successfully user", {classname:'bg-success', "delay":"2000"});
        });
      }catch(error){
        this.toastService.show("Error login", {classname:'bg-warning', "delay":"2000"});
      }
    }else if(this.user.email == '' || this.user.password==''){
      this.toastService.show("Por favor complete todos los campos", {classname:'bg-warning', "delay":"2000"});
    }else{
      this.toastService.show("El usuario no existe", {classname:'bg-danger',"delay":"2000"});
    }
  }
  
  userAutocomplete(email:string,password:string,role:string) {
    this.user.email = email;
    this.user.password = password;
    this.user.role = role;
  }

}
