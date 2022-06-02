import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})
export class AltaPacienteComponent implements OnInit {
  imageURL = "";
  msgImage = "Subir primer imagen";
  msgImageDos = "Subir segunda imagen";
  form: FormGroup;
  imageURLDos = "";
  paciente:Patient = new Patient();
  otraObraSocial:Boolean = false;
  constructor(private fb: FormBuilder, private toast:ToastService, private dataBase:DatabaseService,
    private router:Router) { 
    this.form = this.fb.group({
      name: ["",Validators.required],
      lastname: ["", Validators.required],
      age: ["", Validators.required,Validators.min(0),Validators.max(99)],
      dni: ["", Validators.required,Validators.maxLength(8)],
      mail: ["", Validators.required, Validators.email],
      password: ["", Validators.required],
      obraSocial: ["", Validators.required],
      avatar: [""],
      avatarDos: [""]
    });
  }

  async ngOnInit() {
    const res = await this.dataBase.traerTodo('pacientes');
    res?.subscribe((listaref:any) => {
      this.dataBase.listaPaciente = listaref.map((userRef:any) => userRef.payload.doc.data());
    });
  }

  altaPaciente() {
    if(this.form.status == "INVALID") {
      this.toast.show("Por favor, complete todo los campos", {classname:'bg-danger', "delay":"2000"});
    } else {
      this.dataBase.paciente.age = this.form.controls["age"].value;
      this.dataBase.paciente.dni = this.form.controls["dni"].value;
      this.dataBase.paciente.lastname = this.form.controls["lastname"].value;
      this.dataBase.paciente.mail = this.form.controls["mail"].value;
      this.dataBase.paciente.name = this.form.controls["name"].value;
      this.dataBase.paciente.password = this.form.controls["password"].value;
      this.dataBase.paciente.obraSocial = this.form.controls["obraSocial"].value;
      this.dataBase.paciente.imgOne = this.form.controls["avatar"].value;
      this.dataBase.paciente.imgtwo = this.form.controls["avatarDos"].value;
      //console.log( this.dataBase.paciente);
      this.darDeAlta();
    }
  }

  darDeAlta() {
    const auxpaciente=this.form.value;
    let existe = this.dataBase.listaPaciente.find((email: any) => email.mail == this.form.controls["mail"].value);
      if (!existe && this.form.status != "INVALID") {
        this.dataBase.onRegister(this.form.controls["mail"].value,this.form.controls["password"].value).then(() => {
          console.log(auxpaciente)
          this.dataBase.alta('pacientes', auxpaciente);
          this.dataBase.emailUsuarioLogeado = this.form.controls["mail"].value;
          setTimeout(() => {        
            this.router.navigateByUrl('/home');
          }, 200);
          this.toast.show("Alta exitosa", {classname:'bg-success', "delay":"2000"});
        });
      }else if(this.form.status == "INVALID"){
        this.toast.show("Por favor complete los datos pedidos",{classname:'bg-warning', "delay":"2000"});
      }else{
        this.toast.show("Ya existe usuario",{classname:'bg-danger', "delay":"2000"});
      }
  }

  async uploadImage(event:any) {
    const file = event.target.files[0];
    this.form.controls["avatar"].setValue(file);
    this.form.controls["avatar"].updateValueAndValidity()
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageURL = reader.result as string;
      this.msgImage = "";
    }
  }

  async uploadImageDos(event:any) {
    const file = event.target.files[0];
    this.form.controls["avatarDos"].setValue(file);
    this.form.controls["avatarDos"].updateValueAndValidity()
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageURLDos = reader.result as string;
      this.msgImageDos = "";
    }
  }

  seSeleccionoObraSocial($event:any) {
    if($event.target.value == "Otros") {
      this.otraObraSocial = true;
      this.form.controls["obraSocial"].setValue(""); 
    } else {
      this.otraObraSocial = false;
      this.form.controls["obraSocial"].setValue($event.target.value); 
    }    
  }
}
