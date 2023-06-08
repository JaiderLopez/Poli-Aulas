import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
//Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegisterComponent } from './Componentes/register/register.component';
import { ViewPersonasComponent } from './Componentes/views/view-personas/view-personas.component';
import { EditPersonaComponent } from './Componentes/views/edit-persona/edit-persona.component';
import { ViewAulaComponent } from './Componentes/views/view-aula/view-aula.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ViewPersonasComponent,
    EditPersonaComponent,
    ViewAulaComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
