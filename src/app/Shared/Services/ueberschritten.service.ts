import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UeberschrittenService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  updateStart() {
    return this.httpClient.put(this.url + `ueberschritten/start`, null);
  }

  updateEnd() {
    return this.httpClient.put(this.url + `ueberschritten/end`, null);
  }

  updateStartFalse() {
    return this.httpClient.put(this.url + `ueberschritten/start/false`, null);
  }

  updateEndFalse() {
    return this.httpClient.put(this.url + `ueberschritten/end/false`, null);
  }
}
