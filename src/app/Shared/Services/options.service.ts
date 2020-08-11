import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getOptions(id: number) {
    return this.httpClient.get(this.url + `options/` + id);
  }

  updateMailOption(mailOption: any) {
    return this.httpClient.put(this.url + `options/mailoption`, mailOption);
  }
}
