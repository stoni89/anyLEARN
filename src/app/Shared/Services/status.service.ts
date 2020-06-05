import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getAllStatus() {
    return this.httpClient.get(this.url + `status`);
  }
}
