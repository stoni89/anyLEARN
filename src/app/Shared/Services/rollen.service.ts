import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RollenService {

  constructor(private httpClient: HttpClient) { }

  getAllRollen() {
    return this.httpClient.get(`http://localhost:3000/rollen`);
  }
}
