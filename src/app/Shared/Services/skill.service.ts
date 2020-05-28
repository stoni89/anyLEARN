import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private listners = new Subject<any>();
  currentData: any;

  constructor(private httpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    skill_id: new FormControl(null),
    skill: new FormControl('', Validators.required),
    lernziel: new FormControl('', Validators.required),
    inhalt: new FormControl('', Validators.required),
    zeitaufwand: new FormControl('', Validators.required),
    zeitpunkt: new FormControl(null, [Validators.required]),
    vermittler_id: new FormControl(null, Validators.required),
    bereich_id: new FormControl(1, Validators.required),
    nachweis: new FormControl('', Validators.required),
    nachname: new FormControl(''),
    bereich: new FormControl(''),
    kategorie: new FormControl(''),
    kategorie_id: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      skill_id: null,
      skill: '',
      lernziel: '',
      inhalt: '',
      zeitaufwand: '',
      zeitpunkt: null,
      vermittler_id: 1,
      bereich_id: 1,
      nachweis: '',
      nachname: '',
      bereich: '',
      kategorie: '',
      kategorie_id: ''
    });
  }

  populateForm(skill) {
    this.form.setValue(skill);
    this.form.patchValue({
      kategorie_id: this.form.value.kategorie_id.split(',').map(function(item) {return parseInt(item, 10)})
    });

  }

  getAllSkills() {
    return this.httpClient.get(`http://localhost:3000/skill`);
  }

  getSpezificSkill(id: number) {
    this.httpClient.get(`http://localhost:3000/skill/` + id);
  }

  setSkill(newUser: any) {
    return this.httpClient.post(`http://localhost:3000/skill`, newUser);
  }

  updateSkill(editUser: any) {
    return this.httpClient.put(`http://localhost:3000/skill`, editUser);
  }

  getLastSkillID(name: string) {
    return this.httpClient.get(`http://localhost:3000/skillID/` + name);
  }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

}
