import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { RegisterComponent } from './Componentes/register/register.component';
import { LoginComponent } from './Componentes/login/login.component';
import { ViewPersonasComponent } from './Componentes/views/view-personas/view-personas.component';
import { EditPersonaComponent } from './Componentes/views/edit-persona/edit-persona.component';
import { ViewAulaComponent } from './Componentes/views/view-aula/view-aula.component';
import { AsignaturasComponent } from './Componentes/asignaturas/asignaturas.component';
import { GruposComponent } from './Componentes/grupos/grupos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'viewper', component: ViewPersonasComponent},
  { path: 'subjects', component: AsignaturasComponent},
  { path: 'groups', component: GruposComponent},
  { path: 'editper/:id', component: EditPersonaComponent},
  { path: 'viewau/:id', component: ViewAulaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
