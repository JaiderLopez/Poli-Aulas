import { Component } from '@angular/core';

import { PersonaService } from 'src/app/Servicios/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formulario: FormGroup;
  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

  login() {
    
    let mail = this.formulario.get('email').value
    console.log(mail);
    this.personaService.getLogin(mail).subscribe(res => {
      res.map(d=>{
        console.log(d);
      })
      // console.log(res);
    })
  }



}
