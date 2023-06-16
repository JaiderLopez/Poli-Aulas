import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

public registerForm: FormGroup;

constructor(
  private personaService: PersonaService,
  private formBuilder: FormBuilder,
  private router: Router,
){
  this.registerForm= this.formBuilder.group({
    name: [''],
    email: [''],
    password: [''],
    type: [''],
    state: [''],
    subject: [''],
    group: [''],
  })
}

onSubmit(){
  this.personaService.addPersona(this.registerForm.value);
  this.router.navigate(['viewper']);
}

atHome(){
  this.router.navigate(['home']);
}

toViewPer(){
  this.router.navigate(['viewper']);
}

}
