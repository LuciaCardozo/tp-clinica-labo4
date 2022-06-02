import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  listaDeCorreos: any = [];
  usuario = {
    email: '',
    password: ''
  };

  constructor(private database: DatabaseService,
    private router: Router,
    private toastService: ToastService) { }

  async ngOnInit() {
    const res = await this.database.traerTodo('pacientes');
    res?.subscribe((listaref: any) => {
      this.listaDeCorreos = listaref.map((userRef: any) => userRef.payload.doc.data());
    });
  }


  loginWithValidation() {
    let existe=this.listaDeCorreos.find((email: any) => email.mail == this.user.email && email.password == this.user.password);
    if (existe) {
      try{
          this.database.onLogin(this.user.email, this.user.password).then(()=>{
          this.database.emailUsuarioLogeado = this.user.email;   
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
  
  userAutocomplete(email:string,password:string) {
    this.user.email = email;
    this.user.password = password
  }

}
