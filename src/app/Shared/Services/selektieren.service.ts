import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SelektierenService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getSelectUserID(userID: any) {
    return this.httpClient.get(this.url + `selektieren/` + userID);
  }
}
