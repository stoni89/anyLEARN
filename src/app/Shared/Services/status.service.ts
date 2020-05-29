import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  getAllStatus() {
    return this.httpClient.get(`http://localhost:3000/status`);
  }
}
