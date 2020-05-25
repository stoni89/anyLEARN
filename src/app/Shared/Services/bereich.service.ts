import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BereichService {

  constructor(private httpClient: HttpClient) { }

  getAllBereich() {
    return this.httpClient.get(`http://localhost:3000/bereich`);
  }
}
