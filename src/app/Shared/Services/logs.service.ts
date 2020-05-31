import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private listners = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getLogs() {
    return this.httpClient.get(`http://localhost:3000/logs`);
  }

  newLogs(newLogs: any) {
    return this.httpClient.post(`http://localhost:3000/logs`, newLogs);
  }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
