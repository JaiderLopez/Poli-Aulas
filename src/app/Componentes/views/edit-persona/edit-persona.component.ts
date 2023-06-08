import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent {

  public editPerForm: FormGroup;

  personaRef: any

  constructor(
    private personaService: PersonaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute
  ){
    this.editPerForm = this.formBuilder.group({
    name: [''],
    email: [''],
    password: [''],
    type: [''],
    state: [''],
  })
  }

  //metodos

  ngOnInit(): void{
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.personaService.getPersona(id).subscribe( res=> {
      this.personaRef= res;
      this.editPerForm= this.formBuilder.group({
        name: [this.personaRef.name],
        email: [this.personaRef.email],
        password: [this.personaRef.password],
        type: [this.personaRef.type],
        state: [this.personaRef.state],
      })
    })
  }

  onSubmit(){
    const id = this.activedRoute.snapshot.paramMap.get('id')
    this.personaService.updatePersona(this.editPerForm.value, id)
    this.router.navigate(['viewper'])
  }
  
  atHome(){
    this.router.navigate(['home']);
  }

}
