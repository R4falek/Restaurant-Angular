import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Dish } from '../models/dish';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  loadDishes() {
    const dbInstance = collection(this.firestore, 'dishes')
    return collectionData(dbInstance, {idField: 'id'});
  }

  loadOneDish(id: string) {
    const dbInstance = doc(this.firestore, `dishes/${id}`);
    return from(getDoc(dbInstance));
  }

  saveDish(data: Dish) {
    const dbInstance = collection(this.firestore, 'dishes')
    addDoc(dbInstance, data).then(docRef => {
      this.toastr.success('Dodano danie')
    }).catch(err => {
      this.toastr.warning(err)
    })
  }

  deleteDish(id: string) {
    const docInstance = doc(this.firestore, `dishes/${id}`);
    deleteDoc(docInstance).then(docRef => {
      this.toastr.success('Usunięto danie')
    }).catch(err => {
      this.toastr.warning(err)
    })
  }

  editDish(id: string, data: any) {
    const docInstance = doc(this.firestore, `dishes/${id}`);
    updateDoc(docInstance, data).then(docRef => {
      this.toastr.success('Data updated successfylly!')
    }).catch(err => {
      console.log(err);
    })
  }

}
