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
  estudiante: Persona;
  estudiantes: Grupos;
  grupo: Grupos;
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

  ngOnInit(): void {
    this.asignaturaService.getAsignaturas().subscribe((res) => {
      this.asignaturas = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Asignaturas)
        }
      })
    });

    this.grupoService.getGrupos().subscribe((res) => {
      this.grupos = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Grupos)
        }
      })
    });

    this.personaService.getPersonas().subscribe((res) => {
      this.personas = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Persona)
        }
      })
    });

  }

  onSubmit() {
    // this.grupoService.addGrupo(this.grupoForm.value);
    this.setUserData();

    this.grupoService.addGrupo(this.grupoForm.value);
    // if (res) {
      // console.log(res.id);
      this.updateEstudiante(this.grupoForm.value.id_estudiante, this.grupoForm.value.id_asignatura);
      // this.updateGrupo(res.id, this.grupoForm.value.id_estudiantes)
    // }

    this.grupoForm = this.fb.group({
      // id: [''],
      // code: [''],
      // id_asignatura: [''],
      id_estudiante: [''],
    });

    this.grupoService.getGrupos().subscribe((res) => {
      this.grupos = res.map((e) => {
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

  deleteGrupo(asig) {
    if (confirm("Are you sure to delete")) {
      this.grupoService.deleteGrupo(asig);
    }
  }

  asignaturaId(id) {
    return this.asignaturas.find(asig => asig.id === id).name;
  }
  docenteId(id) {
    return this.personas.find(persona => persona.id === id).name;
  }

  updateEstudiante(id, group) {
    let index = 0;
    this.personaService.getPersona(id).subscribe((est: Persona) => {
      if (index == 0) {
        this.estudiante = est;
        this.estudiante.group.push(group);
        this.personaService.updatePersona(this.estudiante, id);
        index = 1
      }
    });
    console.log(this.estudiante);
  }

  updateGrupo(id, group) {
    let index = 0;
    this.grupoService.getGrupo(id).subscribe((gru: Grupos) => {
      if (index == 0) {
        this.estudiantes = gru;
        this.estudiantes.id_estudiantes.push(group);
        this.grupoService.updateGrupo(this.estudiantes, id);
        index = 1
      }
    });
    console.log(this.estudiante);
  }

  addEstudiantes() {
    console.log("hola");
    this.grupoForm = this.fb.group({
      // id: [''],
      // code: [''],
      // id_asignatura: [''],
      id_estudiante: [''],
    });
    
  }

  setUserData(){
    this.grupo= this.grupoForm.value as Grupos;
    this.grupo.id_estudiantes= [];
  }

}
