import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private listners = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  form: FormGroup = new FormGroup({
    user_id: new FormControl(0),
    istAktiv: new FormControl(1, Validators.required),
    kuerzel: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    mail: new FormControl(''),
    nachname: new FormControl('', Validators.required),
    vorname: new FormControl('', Validators.required),
    rollen_id: new FormControl(1, Validators.required),
    name: new FormControl(''),
    rolle: new FormControl(''),
    kategorie: new FormControl(''),
    kategorie_id: new FormControl(1, Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      name: '',
      nachname: '',
      vorname: '',
      mail: '',
      kuerzel: '',
      user_id: null,
      rollen_id: 1,
      kategorie_id: 1,
      rolle: '',
      kategorie: '',
      istAktiv: 1
    });
  }


  populateForm(user) {
    this.form.setValue(user);
  }


  getAllUsers() {
    return this.httpClient.get(`http://localhost:3000/user`);
  }

  getSpezificUsers(id: number) {
    return this.httpClient.get(`http://localhost:3000/user/` + id);
  }

  setUser(newUser: any) {
    return this.httpClient.post(`http://localhost:3000/user`, newUser);
  }

  updateUser(editUser: any) {
    return this.httpClient.put(`http://localhost:3000/user`, editUser);
  }

  getLastUserID(nachname: string) {
    return this.httpClient.get(`http://localhost:3000/userID/` + nachname);
  }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
