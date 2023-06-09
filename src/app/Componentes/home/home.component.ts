import { Component } from '@angular/core';

import { AulasService } from 'src/app/Servicios/aulas.service';
import { Aulas } from 'src/app/Modelos/aulas.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service'
// import { FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

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
  type: number;

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.name = this.authService.getName();
      this.type = this.authService.getRol();
    }
    this.aulaService.getAulas().subscribe((res) => {
      this.aulas = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Aulas)
        }
      })
      this.aulas = this.sortCards(this.aulas)
      this.bloque = this.getSquare(this.aulas)
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
    // this.router.navigate(['viewau/' + id]);
    this.getAula(id);

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

  getType() {
    if (this.type == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getAula(id: string) {
    this.aulaService.getAula(id).subscribe((data) => {
      this.viewMoreInfo(data as Aulas);
    });
  }

  viewMoreInfo(aula: Aulas) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'AULA',
      html: `
      <div class="row">
        <div class="col-md-12">
          <p><strong>Bloque:</strong> ${aula.square}</p>
          <p><strong>Numero Aula:</strong> ${aula.number}</p>
          <p><strong>Tipo Aula:</strong> ${aula.type}</p>
          <p><strong>Fecha:</strong> ${aula.date}</p>
          <p><strong>Estado:</strong> ${aula.state}</p>
          <p><strong>Hora Inicio:</strong> ${aula.hInicio}</p>
          <p><strong>Hora Fin:</strong> ${aula.hFin}</p>
        </div>
      </div>
      `,
      width: 400,
      heightAuto: false,
      color: '#328e6f',
      backdrop: `rgba(0,0,0,0.4)`,
      confirmButtonText: 'Solicitar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

}