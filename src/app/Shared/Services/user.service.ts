import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public firestore: AngularFirestore) {
  }

  getAllusers() {
    return this.firestore.collection('user').valueChanges();
  }

}
