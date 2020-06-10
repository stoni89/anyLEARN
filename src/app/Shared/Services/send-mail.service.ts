import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) { }

  sendEmail() {
    const user = {
      email: 'js@anyware.ag'
    };

    return this.httpClient.post(this.url + `sendMail`, user).subscribe(data => {
      console.log(data);
    });
  }

}
