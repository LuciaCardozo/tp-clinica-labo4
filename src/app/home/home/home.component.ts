import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isEspecialista:boolean = false;
  isPaciente:boolean = false;
  isAdmin:boolean = false;
  constructor(private database:DatabaseService) { }

  ngOnInit(): void {
    this.mostrarMenu(this.database.role);
  }

  mostrarMenu(dato:string) {
    switch(dato) {
      case ("especialista"):
        this.isEspecialista = true;
      break;
      case ("paciente"):
        this.isPaciente = true;
      break;
      case ("admin"):
        this.isAdmin = true;
      break;
    }
  }

}
