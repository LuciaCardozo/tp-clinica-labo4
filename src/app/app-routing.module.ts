import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard/guard.guard';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {path:"",redirectTo:"bienvenida/login",pathMatch:"full"},
  {path:"bienvenida",loadChildren:() => import('./bienvenida/bienvenida.module').then(m => m.BienvenidaModule)},
  {path:"home",loadChildren:() => import('./home/home.module').then(m => m.HomeModule),canActivate:[GuardGuard]},
  {path:"**",component:ErrorComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
