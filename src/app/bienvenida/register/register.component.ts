import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isEspecialista:any;
  constructor() { }

  ngOnInit(): void {
  }

  seSeleccionRole($event:any) {
    if($event.target.value == "Especialista") {
      this.isEspecialista = true;
    } else {
      this.isEspecialista = false;
    }
  }
}
