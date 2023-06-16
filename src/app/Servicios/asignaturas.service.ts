import { Injectable } from '@angular/core';

import { Asignaturas } from '../Modelos/asignaturas.model'; //modelo asignaturas
import { AngularFirestore } from '@angular/fire/compat/firestore'; //servicio firebase

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(private angularFireStore: AngularFirestore) { }

  //                Metodos
  //obterner todas
  getAsignaturas(){
    return this.angularFireStore.collection('asignaturas').snapshotChanges();
  }

  //obtener una asig por name
  getAsigName(name){
    const ref =  this.angularFireStore.doc(`asignaturas/${name}`);
    return ref.valueChanges() ;
  }

  //optener una asignatura
  getAsignatura(id){
    return this.angularFireStore.collection("asignaturas").doc(id).valueChanges();
  }

  //agregar una nueva asignatura
  addAsignatura(asignatura: Asignaturas){
    return new Promise<any>((resolve, reject)=>{
      this.angularFireStore
      .collection("asignaturas")
      .add(asignatura)
      .then((res)=>{
        console.log(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  //eliminar asignatura
  deleteAsignatura(id) {
    return this.angularFireStore.collection("asignaturas").doc(id).delete();
  }





}
