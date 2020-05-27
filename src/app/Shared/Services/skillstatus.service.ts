import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillstatusService {

  constructor(private httpClient: HttpClient) { }


  setSkillStatus(newSkillStatus: any) {
    return this.httpClient.post(`http://localhost:3000/skillstatus`, newSkillStatus);
   }
}
