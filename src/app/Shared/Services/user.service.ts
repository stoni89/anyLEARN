import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { User } from '../Interfaces/user';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public firestore: AngularFirestore) {
  }

  form: FormGroup = new FormGroup({
    istAktiv: new FormControl(false),
    kuerzel: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.email),
    nachname: new FormControl('', Validators.required),
    vorname: new FormControl('', Validators.required),
    rolle: new FormControl(0),
    name: new FormControl('', Validators.required),
    zugehoerigkeit: new FormControl(0)
  });

  initializeFormGroup() {
    this.form.setValue({
      name: ''
    });
  }

  getAllusers() {
    return this.firestore.collection('user').valueChanges();
  }

  populateForm(user) {
    this.form.setValue(user);
  }
}
