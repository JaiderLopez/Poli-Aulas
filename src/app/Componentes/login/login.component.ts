import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Persona } from 'src/app/Modelos/persona.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formulario: FormGroup;
  constructor(private personaService: PersonaService, private formBuilder: FormBuilder, 
    private router: Router, private authService: AuthService) {
    this.formulario = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.home();
    }
  }

  onSubmit() {
      this.personaService.getLogin(this.formulario.get('email').value).subscribe((data) => {
      this.login(data as Persona[]);
      
    });
  }

  login(dataPersona: Persona[]) {
    if (dataPersona.length == 0) {
      alert('El usuario no existe');
    } else if (dataPersona[0].email == this.formulario.get('email').value && dataPersona[0].password == this.formulario.get('password').value) {
      this.authService.login(dataPersona[0].email, dataPersona[0].password, dataPersona[0].name);
      this.home();
      // alert('Bienvenido ' + dataPersona[0].name);
    } else {
      alert('El usuario o la contraseña son incorrectos');
    }
  }

  home() {
    // Save data in local storage encripted
    this.router.navigate(['/home']);
  }
    
}
