import { Injectable } from '@angular/core';

//servicio de angular
import { AngularFirestore } from '@angular/fire/compat/firestore'
//modelo [persona]={name, gmail, password, type, state}
import { Persona } from '../Modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private angularFireStore: AngularFirestore) { }

  //           FUNCIONES PARA PERSONA
  //optener todos
  getPersonas(){
    return this.angularFireStore.collection("persona").snapshotChanges();
  }
  //optener una persona
  getPersona(id){
    return this.angularFireStore.collection("persona").doc(id).valueChanges();
  }
  //agregar una persona
  addPersona(persona: Persona){
    return new Promise<any>((resolve, reject)=>{
      this.angularFireStore
      .collection("persona")
      .add(persona)
      .then((res)=>{
        console.log(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }
  //actualizar una persona
  updatePersona(persona: Persona, id){
    return this.angularFireStore.collection("persona").doc(id).update({
           name: persona.name,
           gmail: persona.email,
           password: persona.password,
           type: persona.type,
           state: persona.state
    })
  }
  //eliminar persona
  deletePersona(id){
    return this.angularFireStore.collection("persona").doc(id).delete();
  }


}
