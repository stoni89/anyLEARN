import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private listners = new Subject<any>();
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    skill_id: new FormControl(null),
    bezeichnung: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      skill_id: null,
      bezeichnung: '',
      url: ''
    });
  }

  populateForm(link) {
    this.form.setValue(link);
  }


  getAllLinks() {
    return this.httpClient.get(this.url + `links`);
  }

  getSpezificLink(id: number) {
    return this.httpClient.get(this.url + `links/` + id);
  }

  newLink(newLink: any) {
    return this.httpClient.post(this.url + `links`, newLink);
  }

  removeLink(id: number) {
    return this.httpClient.delete(this.url + `links/` + id);
   }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
