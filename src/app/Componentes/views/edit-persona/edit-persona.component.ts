import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent {

  public editPerForm: FormGroup;

  constructor(
    private personaService: PersonaService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){
    this.editPerForm= this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      type: [''],
      state: [''],
    })
  }
  
  onSubmit(){
    this.personaService.addPersona(this.editPerForm.value);
    this.router.navigate(['viewper']);
  }
  
  atHome(){
    this.router.navigate(['home']);
  }

}
