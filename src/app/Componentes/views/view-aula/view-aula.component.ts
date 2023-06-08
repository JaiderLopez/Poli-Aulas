import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AulasService } from 'src/app/Servicios/aulas.service';


@Component({
  selector: 'app-view-aula',
  templateUrl: './view-aula.component.html',
  styleUrls: ['./view-aula.component.css']
})
export class ViewAulaComponent {
  public aulaForm: FormGroup;

  aulaRef: any

  constructor (
    private fb: FormBuilder, 
    private router: Router,
    private aulaService: AulasService,
    private activatedRouter: ActivatedRoute
    ){
      this.aulaForm = this.fb.group({
        type: [''],
        square: [''],
        number: [''],
        state: [''],
        date: [''],
        hInicio: [''],
        hFin: [''],
      })
    }
  
    ngOnInit(): void {
      const id = this.activatedRouter.snapshot.paramMap.get('id');
      this.aulaService.getAula(id).subscribe( res=> {
      this.aulaRef= res;
      this.aulaForm= this.fb.group({
        type: [this.aulaRef.type],
        square: [this.aulaRef.square],
        number: [this.aulaRef.number],
        state: [this.aulaRef.state],
        date: [this.aulaRef.date],
        hInicio: [this.aulaRef.hInicio],
        hFin: [this.aulaRef.hFin],
        })
      })
    }
  
    onSubmit(){
      const id = this.activatedRouter.snapshot.paramMap.get('id')
      this.aulaService.updateAula(this.aulaForm.value, id)
      this.router.navigate(['home'])
    }

    atHome(){
      this.router.navigate(['home']);
    }


}
