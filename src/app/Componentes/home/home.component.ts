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
    // this.aulaService.getAula(id).subscribe((data) => {
    //   this.viewMoreInfo(data as Aulas);
    // });
    let aula: Aulas;
    aula = this.aulas.find(aula => aula.id === id);
    this.viewMoreInfo(aula);
  }

  viewMoreInfo(aula: Aulas) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Información del aula',
      html: `
        <p><strong>Bloque:</strong> ${aula.square}</p>
        <p><strong>Número de aula:</strong> ${aula.number}</p>
        <p><strong>Tipo de aula:</strong> ${aula.type}</p>
        <p><strong>Fecha:</strong> ${aula.date}</p>
        <p><strong>Estado:</strong> ${aula.state}</p>
        <p><strong>Hora de inicio:</strong> ${aula.hInicio}</p>
        <p><strong>Hora fin:</strong> ${aula.hFin}</p>
      `,
      confirmButtonText: 'Solicitar',
      confirmButtonColor: '#328e6f',
    }).then((result) => {
      if (aula.state == 'libre') {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Solicitud enviada',
            'La solicitud ha sido enviada correctamente',
            'success'
          )
          // this.aulaService.updateAula(aula);
        }
      } else {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Aula no disponible',
            'El aula no está disponible',
            'error'
          )
        }
      }
    })
  }

  mostrarAlertaDatosAula() {
    const datosAula = {
      bloque: 'Bloque A',
      numero: '101',
      tipo: 'Aula teórica',
      fecha: '2023-06-09',
      estado: 'Disponible',
      horaInicio: '09:00',
      horaFin: '11:00'
    };

    Swal.fire({
      title: 'Información del aula',
      html: `
        <p><strong>Bloque:</strong> ${datosAula.bloque}</p>
        <p><strong>Número de aula:</strong> ${datosAula.numero}</p>
        <p><strong>Tipo de aula:</strong> ${datosAula.tipo}</p>
        <p><strong>Fecha:</strong> ${datosAula.fecha}</p>
        <p><strong>Estado:</strong> ${datosAula.estado}</p>
        <p><strong>Hora de inicio:</strong> ${datosAula.horaInicio}</p>
        <p><strong>Hora fin:</strong> ${datosAula.horaFin}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }
}
