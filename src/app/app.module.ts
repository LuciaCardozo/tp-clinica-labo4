import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastComponent } from './shared/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
const firebaseConfig = {
  apiKey: "AIzaSyArRE_ER1KWu4DizpiWm43TOxl-lY7m1rM",
  authDomain: "db-generico.firebaseapp.com",
  projectId: "db-generico",
  storageBucket: "db-generico.appspot.com",
  messagingSenderId: "1012963788940",
  appId: "1:1012963788940:web:327c3d61c22a6c4123d3a9"
};
@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
