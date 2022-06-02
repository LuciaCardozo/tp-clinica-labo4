import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Specialties } from 'src/app/models/enum/specialties.enum';
import { Specialist } from 'src/app/models/specialist';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.css']
})
export class AltaEspecialistaComponent implements OnInit {
  form: FormGroup;
  imageURL = "";
  msgImage = "Subir Imagen";
  especialista:Specialist = new Specialist();
  otraEspecialidad:Boolean = false;
  constructor(private fb: FormBuilder, private toast:ToastService, private dataBase:DatabaseService) { 
    this.form = this.fb.group({
      name: ["",Validators.required],
      lastname: ["", Validators.required],
      age: ["", Validators.required],
      dni: ["", Validators.required],
      mail: ["", Validators.required],
      password: ["", Validators.required],
      especialidad: ["", Validators.required],
      avatar: [""]
    });
  }

  ngOnInit(): void {
  }
  altaEspecialista() {
    if(this.form.status == "INVALID") {
      this.toast.show("Por favor, complete todo los campos", {classname:'bg-danger', "delay":"2000"});
    } else {
      this.dataBase.especialista.age = this.form.controls["age"].value;
      this.dataBase.especialista.dni = this.form.controls["dni"].value;
      this.dataBase.especialista.lastname = this.form.controls["lastname"].value;
      this.dataBase.especialista.mail = this.form.controls["mail"].value;
      this.dataBase.especialista.name = this.form.controls["name"].value;
      this.dataBase.especialista.password = this.form.controls["password"].value;
      this.dataBase.especialista.specialty = this.form.controls["especialidad"].value;
      this.dataBase.especialista.image = this.form.controls["avatar"].value;
      console.log( this.dataBase.especialista);
      this.toast.show("Bienvenid@ "+this.form.controls["name"].value, {classname:'bg-success', "delay":"2000"});
    }
  }

  seSeleccionoEspecialidad(event:any) {
    if(event.target.value == "Otros") {
      this.otraEspecialidad = true;
      this.form.controls["especialidad"].setValue(""); 
    } else {
      this.otraEspecialidad = false;
      this.form.controls["especialidad"].setValue(event.target.value); 
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
}
