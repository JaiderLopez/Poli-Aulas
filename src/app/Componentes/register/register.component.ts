import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Modelos/persona.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

public registerForm: FormGroup;
persona: Persona;
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
    // subject: [''],
    // group: [''],
  })
}

onSubmit(){
  if(this.registerForm.valid){
  this.setUserData();
  this.personaService.addPersona(this.persona);
  this.router.navigate(['viewper']);}
}

atHome(){
  this.router.navigate(['home']);
}

toViewPer(){
  this.router.navigate(['viewper']);
}

setUserData(){
  // this.persona.name= this.registerForm.value.name;
  // this.persona.email= this.registerForm.value.email;
  // this.persona.password= this.registerForm.value.password;
  // this.persona.type= this.registerForm.value.type;
  // this.persona.state= this.registerForm.value.state;
  this.persona= this.registerForm.value as Persona;
  this.persona.subject= [];
  this.persona.group= [];
}

}
