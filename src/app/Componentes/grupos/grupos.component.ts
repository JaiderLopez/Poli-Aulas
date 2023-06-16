import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Grupos } from 'src/app/Modelos/grupos.model';
import { GruposService } from 'src/app/Servicios/grupos.service';
//asig
import { AsignaturasService } from 'src/app/Servicios/asignaturas.service';
import { Asignaturas } from 'src/app/Modelos/asignaturas.model';
//personas
import { Persona } from 'src/app/Modelos/persona.model';
import { PersonaService } from 'src/app/Servicios/persona.service';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
  public grupoForm: FormGroup;
  asignaturas: Asignaturas[];
  grupos: Grupos[];
  personas: Persona[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private grupoService: GruposService,
    private asignaturaService: AsignaturasService,
    private personaService: PersonaService) {
    this.grupoForm = this.fb.group({
      // id: [''],
      code: [''],
      id_asignatura: [''],
      id_estudiante: [''],
    });
  }

  ngOnInit():void{
    this.asignaturaService.getAsignaturas().subscribe( (res)=>{
      this.asignaturas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Asignaturas)
        }
      })
    });

    this.grupoService.getGrupos().subscribe( (res)=>{
      this.grupos = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Grupos)
        }
      })
    });

    this.personaService.getPersonas().subscribe( (res)=>{
      this.personas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Persona)
        }
      })
    });

  }

  onSubmit(){
    this.grupoService.addGrupo(this.grupoForm.value);
    this.grupoForm = this.fb.group({
      // id: [''],
      code: [''],
      id_asignatura: [''],
      id_estudiante: [''],
    });

    this.grupoService.getGrupos().subscribe( (res)=>{
      this.grupos = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Grupos)
        }
      })
    });
  }

  atHome() {
    this.router.navigate(['home']);
  }

  deleteGrupo(asig){
    if(confirm("Are you sure to delete")) {
      this.grupoService.deleteGrupo(asig);
    }
  }

  asignaturaId(id){
    let name:any = this.asignaturaService.getAsignatura(id);
    // console.log(name);
    return name;
  }

  estudianteId(id){
    let name:any = this.personaService.getPersona(id);
    // console.log(name);
    return name;
  }

}
