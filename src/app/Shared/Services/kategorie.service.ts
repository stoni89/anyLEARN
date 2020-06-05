import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KategorieService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getAllKategorie() {
    return this.httpClient.get(this.url + `kategorie`);
  }
}
