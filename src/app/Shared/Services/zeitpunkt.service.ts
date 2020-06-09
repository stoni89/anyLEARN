import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZeitpunktService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getAllZeitpunkt() {
    return this.httpClient.get(this.url + `zeitpunkt`);
  }
}
