import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SelektierenService {

  constructor(private httpClient: HttpClient) { }

  getSelectUserID(userID: any) {
    return this.httpClient.get(`http://localhost:3000/selektieren/` + userID);
  }
}
