import { Injectable } from '@angular/core';

//servicio
import { AngularFirestore} from '@angular/fire/compat/firestore'
//modelo
import { Aulas } from '../Modelos/aulas.model';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  constructor(private angularFireStore: AngularFirestore) { }

  //           FUNCIONES PARA PERSONA
  //obtener todas las aulas
  getAulas(){
    return this.angularFireStore.collection("aulas").snapshotChanges();
  }
  //obtener un aula
  getAula(id){
    return this.angularFireStore.collection("aulas").doc(id).valueChanges();
  }
  //actualizar un aula
  updateAula(aula: Aulas, id){
    return this.angularFireStore.collection("aulas").doc(id).update({
      type: aula.type,
      square: aula.square,
      number: aula.number,
      state: aula.state,
      date: aula.date,
      hInicio: aula.hInicio,
      hFin: aula.hFin,
    })
  }
  addAulas(aula: Aulas){
    return new Promise<any>((resolve, reject)=>{
      this.angularFireStore
      .collection("aulas")
      .add(aula)
      .then((res)=>{
        console.log(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  deleteAula(id){
    return this.angularFireStore.collection("aulas").doc(id).delete();
  }
  
}
