import { Component } from '@angular/core';

import { AulasService } from 'src/app/Servicios/aulas.service';
import { Aulas } from 'src/app/Modelos/aulas.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service'
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // public postForm: FormGroup;
  // private formBuilder: FormBuilder
  constructor(private aulaService: AulasService, private router: Router, private authService: AuthService) {
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
  bloque: string[];
  name: string;
  type: string;

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.name = this.authService.getName();
      this.type = this.authService.getType();
    }
    this.aulaService.getAulas().subscribe((res) => {
      this.aulas = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Aulas)
        }
      })
      this.aulas= this.sortCards(this.aulas)
      this.bloque= this.getSquare(this.aulas)
    })
    
  }

  deleteAula(aula) {
    this.aulaService.deleteAula(aula);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // onSubmit(){
  //   this.aulaService.addAulas(this.postForm.value);
  //   alert("aggre");
  // }
  toViewAula(id) {
    this.router.navigate(['viewau/' + id]);
  }

  sortCards(cards: Aulas[]): Aulas[] {
    return cards.sort((a, b) => {
      if (a.square === b.square) {
        return a.number.localeCompare(b.number);
      }
      return a.square.localeCompare(b.square);
    });
  }

  getSquare(cards: Aulas[]): string[] {
    // return cards.map(card => card.square);
    const squares = cards.map(card => card.square);
    return squares.filter((square, index) => squares.indexOf(square) === index);
  }

  getType(){
    if(this.type=='administrador'){
      return true;
    }
    else{
      return false;
    }
  }

}