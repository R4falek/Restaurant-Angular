import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private firestore: Firestore, private toast: ToastrService) { }

  loadComments(id: string) {
    const dbInstance = collection(this.firestore, `dishes/${id}/comments`)
    return collectionData(dbInstance);
  }

  saveComment(id: string, data: any) {
    const dbInstance = collection(this.firestore, `dishes/${id}/comments`)
    addDoc(dbInstance, data).then(docRef => {
      this.toast.success('Komentarz dodano')
    }).catch(err => {
      this.toast.warning(err);
    })
  }

}
