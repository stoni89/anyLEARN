import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SkillkategorieService {
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  getSpezificSkillKategorie(id: number) {
   return this.httpClient.get(this.url + `skillkategorie/` + id);
  }

  setSkillKategorie(newSkillKategorie: any) {
    return this.httpClient.post(this.url + `skillkategorie`, newSkillKategorie);
   }

   removeSkillKategorie(id: number) {
    return this.httpClient.delete(this.url + `skillkategorie/` + id);
   }
}
