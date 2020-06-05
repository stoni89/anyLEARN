import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private listners = new Subject<any>();
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getLogs() {
    return this.httpClient.get(this.url + `logs`);
  }

  newLogs(newLogs: any) {
    return this.httpClient.post(this.url + `logs`, newLogs);
  }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
