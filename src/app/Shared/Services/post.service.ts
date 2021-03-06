import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private listners = new Subject<any>();
  badgeCount: Observable<number>;
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) {
   }

   form: FormGroup = new FormGroup({
    skill_id: new FormControl(null),
    skill: new FormControl(''),
    lernziel: new FormControl(''),
    inhalt: new FormControl(''),
    zeitaufwand: new FormControl(''),
    zeitpunkt_id: new FormControl(null),
    endzeitpunkt_id: new FormControl(null),
    vermittler_id: new FormControl(null),
    bereich_id: new FormControl(1),
    nachweis: new FormControl(''),
    linkAnzahl: new FormControl(null),
    nachname: new FormControl(''),
    zeitpunkt: new FormControl(''),
    endzeitpunkt: new FormControl(''),
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
      endzeitpunkt_id: 1,
      vermittler_id: 1,
      bereich_id: 1,
      nachweis: '',
      nachname: '',
      zeitpunkt: '',
      linkAnzahl: null,
      endzeitpunkt: '',
      bereich: '',
      kategorie: '',
      kategorie_id: ''
    });
  }

  populateForm(post) {
    this.form.setValue(post);
  }



  getPostID(id: number) {
    return this.httpClient.get(this.url + `post/` + id);
  }

  getMailData(id: number) {
    return this.httpClient.get(this.url + `post/maildata/` + id);
  }

  getPostIDCount(id: number) {
    return this.httpClient.get(this.url + `post/count/` + id);
  }

  removePost(id: number) {
    return this.httpClient.delete(this.url + `post/` + id);
   }

  newPost(newPost: any) {
    return this.httpClient.post(this.url + `post`, newPost);
  }


  public sendEmail(nam: string, toEmail: string, openMails: number) {
    const templateParams = {
      name: nam,
      open_mails: openMails,
      reply_toEmail: toEmail
    };

    emailjs.send('anylearn', 'template_LrEJ2Cnx', templateParams, 'user_TiZKKsDMiqUCkLRrAGjZW')
      .then((response) => {
        console.log(response.text);
      }, (error) => {
        console.log(error.text);
      });
  }



  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  updateBadge() {
    const tempUserID = parseInt(localStorage.getItem('userid'));
    this.getPostIDCount(tempUserID).subscribe(data => {
      this.badgeCount = data[0].anzahl;
    });
  }
}
