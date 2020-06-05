import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RollenService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getAllRollen() {
    return this.httpClient.get(this.url + `rollen`);
  }
}
