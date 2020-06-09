import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  sendEmail() {
    return this.httpClient.post(this.url + `sendMail`, {email: 'jens.steinbrech@anyware.ag'});
  }

}
