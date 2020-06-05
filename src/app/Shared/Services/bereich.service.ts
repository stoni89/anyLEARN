import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BereichService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getAllBereich() {
    return this.httpClient.get(this.url + `bereich`);
  }
}
