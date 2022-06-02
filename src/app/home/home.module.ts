import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from '../shared/homes/home-admin/home-admin.component';
import { HomeEspecialistaComponent } from '../shared/homes/home-especialista/home-especialista.component';
import { HomePacienteComponent } from '../shared/homes/home-paciente/home-paciente.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeAdminComponent,
    HomeEspecialistaComponent,
    HomePacienteComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
