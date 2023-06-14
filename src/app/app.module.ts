import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
//Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Security local storage encripted npm install angular-web-storage
import { AngularWebStorageModule } from 'angular-web-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegisterComponent } from './Componentes/register/register.component';
import { ViewPersonasComponent } from './Componentes/views/view-personas/view-personas.component';
import { EditPersonaComponent } from './Componentes/views/edit-persona/edit-persona.component';
import { ViewAulaComponent } from './Componentes/views/view-aula/view-aula.component';
import { AsignaturasComponent } from './Componentes/asignaturas/asignaturas.component';
import { GruposComponent } from './Componentes/grupos/grupos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ViewPersonasComponent,
    EditPersonaComponent,
    ViewAulaComponent,
    AsignaturasComponent,
    GruposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Angular
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    //Formularios
    FormsModule,
    ReactiveFormsModule,
    //Security local storage encripted
    // AngularWebStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
