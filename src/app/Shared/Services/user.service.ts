import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  form: FormGroup = new FormGroup({
    user_id: new FormControl(0),
    istAktiv: new FormControl(false),
    kuerzel: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.email),
    nachname: new FormControl('', Validators.required),
    vorname: new FormControl('', Validators.required),
    rollen_id: new FormControl(0),
    name: new FormControl('', Validators.required),
    kategorie_id: new FormControl(0)
  });

  initializeFormGroup() {
    this.form.setValue({
      name: '',
      nachname: '',
      vorname: '',
      mail: '',
      kuerzel: '',
      user_id: 0,
      rollen_id: 0,
      kategorie_id: 0,
      istAktiv: true
    });
  }


  populateForm(user) {
    this.form.setValue(user);
  }


  getAllUsers() {
    return this.httpClient.get(`http://localhost:3000/user`);
  }
}
