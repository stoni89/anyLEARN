import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillstatusService {
  private listners = new Subject<any>();
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }


  setSkillStatus(newSkillStatus: any) {
    return this.httpClient.post(this.url + `skillstatus`, newSkillStatus);
  }

   getSkillTableUser(id: number) {
    return this.httpClient.get(this.url + `skillstatus/` + id);
  }

  updateSkillStatus(skillstatus: any) {
    return this.httpClient.put(this.url + `skillstatus`, skillstatus);
  }

  updateVermittlerSkillStatus(vermittlerSkillStatus: any) {
    return this.httpClient.put(this.url + `vermittler`, vermittlerSkillStatus);
  }

  updateVermittlerSkillStatusSpecific(verSkillStatus: any) {
    return this.httpClient.put(this.url + `vermittler/vermittler`, verSkillStatus);
  }

  removeSkillStatus(id: number) {
    return this.httpClient.delete(this.url + `skillstatus/` + id);
   }




  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
