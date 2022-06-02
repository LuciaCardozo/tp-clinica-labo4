import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.css']
})
export class InputValidatorComponent implements OnInit {
  @Input() condition:any;
  @Input() formName:string = "";
  @Input() nameLabel:string = "";
  @Input() message:string = "";
  @Input() form:any;
  @Input() inputType:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
