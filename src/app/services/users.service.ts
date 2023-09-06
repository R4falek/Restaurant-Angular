import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  saveUser(data: any) {
    const dbInstance = collection(this.firestore, 'users')
    return addDoc(dbInstance, data);
  }

  loadUsers() {
    const dbInstance = collection(this.firestore, 'users')
    return collectionData(dbInstance, {idField: 'id'});
  }

  loadOneUser(id: string) {
    const dbInstance = doc(this.firestore, `users/${id}`);
    return from(getDoc(dbInstance));
  }

  editUser(id: string, data: any) {
    const dbInstance = doc(this.firestore, `users/${id}`);
    updateDoc(dbInstance, data).then(docRef => {
      this.toastr.success('Zaktualizowano');
    }).catch(err => {
      this.toastr.warning(err);
    })
  }

}
