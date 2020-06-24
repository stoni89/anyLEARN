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
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    skill_id: new FormControl(null),
    skill: new FormControl('', Validators.required),
    lernziel: new FormControl('', Validators.required),
    inhalt: new FormControl('', Validators.required),
    zeitaufwand: new FormControl('', Validators.required),
    zeitpunkt_id: new FormControl(null, [Validators.required]),
    vermittler_id: new FormControl(null, Validators.required),
    bereich_id: new FormControl(1, Validators.required),
    nachweis: new FormControl('', Validators.required),
    nachname: new FormControl(''),
    zeitpunkt: new FormControl(''),
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
      zeitpunkt_id: 1,
      vermittler_id: 1,
      bereich_id: 1,
      nachweis: '',
      nachname: '',
      zeitpunkt: '',
      bereich: '',
      kategorie: '',
      kategorie_id: ''
    });
  }

  populateForm(skill) {
    this.form.setValue(skill);
    this.form.patchValue({
      // tslint:disable-next-line: only-arrow-functions
      kategorie_id: this.form.value.kategorie_id.split(',').map(function(item) {return parseInt(item, 10); })
    });

  }

  getAllSkills() {
    return this.httpClient.get(this.url + `skill`);
  }

  getSpezificSkill(id: number) {
    return this.httpClient.get(this.url + `skill/` + id);
  }

  setSkill(newUser: any) {
    return this.httpClient.post(this.url + `skill`, newUser);
  }

  updateSkill(editUser: any) {
    return this.httpClient.put(this.url + `skill`, editUser);
  }

  getLastSkillID() {
    return this.httpClient.get(this.url + `skill/max`);
  }

  removeSkill(id: number) {
    return this.httpClient.delete(this.url + `skill/` + id);
   }


  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

}
