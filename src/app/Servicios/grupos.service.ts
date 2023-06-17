import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore'; //servicio firebase
import { Grupos } from '../Modelos/grupos.model';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private angularFireStore: AngularFirestore) { }

  //                Metodos
  //obterner todos los grupos
  getGrupos(){
    return this.angularFireStore.collection('grupos').snapshotChanges();
  }

  //obtener un grupo por name
  getGrupoName(name){
    const ref =  this.angularFireStore.doc(`grupos/${name}`);
    return ref.valueChanges() ;
  }
  //optener un grupo
  getGrupo(id){
    return this.angularFireStore.collection("grupos").doc(id).valueChanges();
  }

  //agregar un nuevo grupo
  addGrupo(grupo: Grupos){
    return new Promise<any>((resolve, reject)=>{
      this.angularFireStore
      .collection("grupos")
      .add(grupo)
      .then((res)=>{
        console.log(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  async add(group: Grupos){
    return await this.angularFireStore.collection("grupos").add(group);
  }

  //eliminar grupo
  deleteGrupo(id) {
    return this.angularFireStore.collection("grupos").doc(id).delete();
  }
  //update grupo
  updateGrupo(id, grupo: Grupos){
    return this.angularFireStore.collection("grupos").doc(id).update(grupo);
  }

}
