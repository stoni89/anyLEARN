import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'http://srv-automate:3000/';

  constructor() { }

  form: FormGroup = new FormGroup({
    bereich: new FormControl(''),
    bereich_id: new FormControl(null),
    inhalt: new FormControl(''),
    status: new FormControl(''),
    links: new FormControl(''),
    verID: new FormControl(null),
    kategorie: new FormControl(''),
    kategorie_id: new FormControl(null),
    lernziel: new FormControl(''),
    nachweis: new FormControl(''),
    nachname: new FormControl(''),
    skill: new FormControl(''),
    skill_id: new FormControl(null),
    skillstatus_id: new FormControl(null),
    status_id: new FormControl(''),
    user_id: new FormControl(''),
    vermittler: new FormControl(''),
    vermittler_id: new FormControl(null),
    zeitaufwand: new FormControl(''),
    zeitpunkt: new FormControl(null)
  });

  initializeFormGroup() {
    this.form.setValue({
      bereich: '',
      bereich_id: null,
      inhalt: '',
      status: '',
      kategorie: '',
      kategorie_id: null,
      lernziel: '',
      nachweis: '',
      links: '',
      nachname: '',
      skill: '',
      verID: null,
      skill_id: null,
      skillstatus_id: null,
      status_id: '',
      user_id: '',
      vermittler: '',
      vermittler_id: null,
      zeitaufwand: '',
      zeitpunkt: null
    });
  }

  populateForm(dashboard) {
    this.form.setValue(dashboard);
  }
}
