import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service'; //servicio
import { Persona } from 'src/app/Modelos/persona.model'; //modelo
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-personas',
  templateUrl: './view-personas.component.html',
  styleUrls: ['./view-personas.component.css']
})
export class ViewPersonasComponent {

  constructor (private personaService: PersonaService, private router: Router){ }

  personas: Persona[];

  ngOnInit(): void{
    this.personaService.getPersonas().subscribe( (res)=>{
      this.personas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Persona)
        }
      })
    });
  }

  deletePersona(persona){
    this.personaService.deletePersona(persona);
  }

  updatePersona(id){
    // this.router.navigate(['editper/:{{id}}'])
  }

  atRegister(){
    this.router.navigate(['register']);
  }
}
