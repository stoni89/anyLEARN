import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KategorieService {

  constructor(private httpClient: HttpClient) { }

  getAllKategorie() {
    return this.httpClient.get(`http://localhost:3000/kategorie`);
  }
}
