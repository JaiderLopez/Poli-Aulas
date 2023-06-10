import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service'; //servicio
import { Persona } from 'src/app/Modelos/persona.model'; //modelo
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-view-personas',
  templateUrl: './view-personas.component.html',
  styleUrls: ['./view-personas.component.css']
})
export class ViewPersonasComponent {

  constructor (private personaService: PersonaService, private router: Router, private authService: AuthService){ }

  personas: Persona[];

  ngOnInit(): void{
    if (this.authService.getRol() != 0) {
      this.router.navigate(['/home']);
    }
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
    if(confirm("Are you sure to delete")) {
      console.log("Implement delete functionality here");
      this.personaService.deletePersona(persona);
    }
    
  }

  updatePersona(id){
    this.router.navigate(['editper/'+id]);
  }

  atRegister(){
    this.router.navigate(['register']);
  }

  atHome(){
    this.router.navigate(['home']);
  }

}
