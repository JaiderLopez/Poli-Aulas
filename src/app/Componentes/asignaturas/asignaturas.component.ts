import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsignaturasService } from 'src/app/Servicios/asignaturas.service';
import { Asignaturas } from 'src/app/Modelos/asignaturas.model';
//personas
import { Persona } from 'src/app/Modelos/persona.model';
import { PersonaService } from 'src/app/Servicios/persona.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent {
  public asigturaForm: FormGroup;
  personas: Persona[];
  asignaturas: Asignaturas[];
  
  docente: Persona;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private asignturaService: AsignaturasService,
    private personaService: PersonaService) {
    this.asigturaForm = this.fb.group({
      // id: [''],
      name: [''],
      id_docente: [''],
    });
  }

  ngOnInit():void{
    this.personaService.getPersonas().subscribe( (res)=>{
      this.personas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Persona)
        }
      })
    });

    this.asignturaService.getAsignaturas().subscribe( (res)=>{
      this.asignaturas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Asignaturas)
        }
      })
    });
  }

  async onSubmit(){
    
    // const res= await this.asignturaService.addAsignatura(this.asigturaForm.value);
    const res= await this.asignturaService.add(this.asigturaForm.value);
    if(res){
        console.log(res.id);
        this.updateDocente(this.asigturaForm.value.id_docente, res.id);
    }

    this.asigturaForm = this.fb.group({
      // id: [''],
      name: [''],
      id_docente: [''],
    });

    this.asignturaService.getAsignaturas().subscribe( (res)=>{
      this.asignaturas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Asignaturas)
        }
      })
    });

    
  }

  atHome() {
    this.router.navigate(['home']);
  }

  deleteAsignatura(asig){
    if(confirm("Are you sure to delete")) {
      this.asignturaService.deleteAsignatura(asig);
    }
  }

  docenteId(id){
      return this.personas.find(persona => persona.id === id).name;
  }
  asignaturaId(id){
    return this.asignaturas.find(asig => asig.id === id).name;
  }

  updateDocente(id, asig){
    let index=0;
    this.personaService.getPersona(id).subscribe( (doc: Persona) => {
      if(index==0){this.docente = doc; 
      this.docente.subject.push(asig);
      this.personaService.updatePersona(this.docente, id);
      index=1
      }
    });
    console.log(this.docente);
  }


}
