import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillstatusService {
  private listners = new Subject<any>();

  constructor(private httpClient: HttpClient) { }


  setSkillStatus(newSkillStatus: any) {
    return this.httpClient.post(`http://localhost:3000/skillstatus`, newSkillStatus);
   }

   getSkillTableUser(id: number) {
    return this.httpClient.get(`http://localhost:3000/skillstatus/` + id);
  }

  updateSkillStatus(skillstatus: any) {
    return this.httpClient.put(`http://localhost:3000/skillstatus`, skillstatus);
  }

  updateVermittlerSkillStatus(vermittlerSkillStatus: any) {
    return this.httpClient.put(`http://localhost:3000/vermittler`, vermittlerSkillStatus);
  }

  updateVermittlerSkillStatusSpecific(verSkillStatus: any) {
    return this.httpClient.put(`http://localhost:3000/vermittler/vermittler`, verSkillStatus);
  }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
