import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaRoutingModule } from './bienvenida-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaEspecialistaComponent } from '../shared/forms/alta-especialista/alta-especialista.component';
import { InputValidatorComponent } from '../shared/input-validator/input-validator.component';
import { AltaPacienteComponent } from '../shared/forms/alta-paciente/alta-paciente.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AltaEspecialistaComponent,
    InputValidatorComponent,
    AltaPacienteComponent
  ],
  imports: [
    CommonModule,
    BienvenidaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class BienvenidaModule { }
