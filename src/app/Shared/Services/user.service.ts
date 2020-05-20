import { User } from './../Interfaces/user';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
>>>>>>> 54c55a3... UserTable
=======
>>>>>>> 33fddf559615a4351ea64db348650dcd43425692

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
  }

<<<<<<< HEAD
<<<<<<< HEAD
  getAllusers() {
    return this.firestore.collection('user').snapshotChanges();
=======
  getAllusers(): Observable<any> {
    return this.firestore.collection('user').valueChanges();
>>>>>>> 54c55a3... UserTable
=======
  getAllusers() {
    return this.firestore.collection('user').snapshotChanges();
>>>>>>> 33fddf559615a4351ea64db348650dcd43425692
  }
}
