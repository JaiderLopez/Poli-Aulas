import { Component } from '@angular/core';

import { AulasService } from 'src/app/Servicios/aulas.service';
import { Aulas } from 'src/app/Modelos/aulas.model';
import { Router, RouterLink } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // public postForm: FormGroup;
  // private formBuilder: FormBuilder
  constructor(private aulaService: AulasService, private router: Router,) {
  //   this.postForm = this.formBuilder.group({
  //     type: [''],
  //     square: [''],
  //     number: [''],
  //     state: [''],
  //     date: [''],
  //     hInicio: [''],
  //     hFin: [''],
  // })
}

  aulas: Aulas[];

  ngOnInit(): void{
    this.aulaService.getAulas().subscribe( (res)=>{
      this.aulas = res.map( (e)=>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Aulas)
        }
      })
    })
  }

  deleteAula(aula){
    this.aulaService.deleteAula(aula);
  }

  // onSubmit(){
  //   this.aulaService.addAulas(this.postForm.value);
  //   alert("aggre");
  // }
  toViewAula(id){
    this.router.navigate(['viewau/{{id}}']);
  }
}
