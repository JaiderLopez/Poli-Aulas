import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { RegisterComponent } from './Componentes/register/register.component';
import { LoginComponent } from './Componentes/login/login.component';
import { ViewPersonasComponent } from './Componentes/views/view-personas/view-personas.component';
import { EditPersonaComponent } from './Componentes/views/edit-persona/edit-persona.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'viewper', component: ViewPersonasComponent},
  { path: 'editper/:id', component: EditPersonaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
