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

  getSkillStatusCountOffen(userid: number) {
    return this.httpClient.get(this.url + `skillstatus/countoffen/` + userid);
  }

  getSkillStatusCountBearbeitung(userid: number) {
    return this.httpClient.get(this.url + `skillstatus/countbearbeitung/` + userid);
  }

  getSkillStatusCountErledigt(userid: number) {
    return this.httpClient.get(this.url + `skillstatus/counterledigt/` + userid);
  }

  getSkillStatusCountGesamt(userid: number) {
    return this.httpClient.get(this.url + `skillstatus/countgesamt/` + userid);
  }

  getSkillStatusUserOffen(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/useroffen/` + skillid);
  }

  getSkillStatusUserBearbeitung(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/userbearbeitung/` + skillid);
  }

  getSkillStatusUserGenehmigung(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/usergenehmigung/` + skillid);
  }

  getSkillStatusUserErledigt(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/usererledigt/` + skillid);
  }

  getSkillStatusUserErledigtAll(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/countdiff/` + skillid);
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

  getSkillStatusAllUserOffen(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/useralloffen/` + skillid);
  }

  getSkillStatusAllUserBearbeitung(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/userallbearbeitung/` + skillid);
  }

  getSkillStatusAllUserGenehmigung(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/userallgenehmigung/` + skillid);
  }

  getSkillStatusAllUserErledigt(skillid: number) {
    return this.httpClient.get(this.url + `skillstatus/userallerledigt/` + skillid);
  }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
}
