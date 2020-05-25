import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillkategorieService {

  constructor(private httpClient: HttpClient) { }

  getSpezificSkillKategorie(id: number) {
    return this.httpClient.get(`http://localhost:3000/skillkategorie/` + id);
  }
}
