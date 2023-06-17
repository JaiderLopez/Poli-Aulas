import { Injectable } from '@angular/core';

//servicio de firebase
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
  getPersonas() {
    return this.angularFireStore.collection("persona").snapshotChanges();
  }
  //optener una persona
  getPersona(id) {
    return this.angularFireStore.collection("persona").doc(id).valueChanges();
  }
  //agregar una persona
  addPersona(persona: Persona) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection("persona")
        .add(persona)
        .then((res) => {
          console.log(res)
        },
          (error) => {
            reject(error)
          })
    })
  }
  //actualizar una persona
  updatePersona(persona: Persona, id) {
    return this.angularFireStore.collection("persona").doc(id).update({
      name: persona.name,
      gmail: persona.email,
      password: persona.password,
      type: persona.type,
      state: persona.state,
      subject: persona.subject,
      group: persona.group,
    })
  }

  addAsig(asig, id) {
    return this.angularFireStore.collection("persona").doc(id).update({

    })
  }

  addGroup(group, id) {
    return this.angularFireStore.collection("persona").doc(id).update({

    })
  }
  //eliminar persona
  deletePersona(id) {
    return this.angularFireStore.collection("persona").doc(id).delete();
  }

  getLogin(email) {
    return this.angularFireStore.collection("persona", ref => ref.where('email', '==', email)).valueChanges();
  }

}
