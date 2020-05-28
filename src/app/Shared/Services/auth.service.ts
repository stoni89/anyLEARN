import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authClient = new OktaAuth({
    issuer: 'https://dev-644733.okta.com/oauth2/default',
    clientId: '{0oada5mm7WqHzFsJX4x6}'
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, public userService: UserService, private snackbar: MatSnackBar) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string) {
    const transaction = await this.authClient.signIn({username, password});

    if (transaction.status !== 'SUCCESS') {
      throw Error('We cannot handle the ' + transaction.status + ' status');
    }

    this.userService.getSpezificUsersMail(username).subscribe(data => {
      if (data[0]['mail'] == username)
      {
        localStorage.setItem('role', data[0]['rolle']);
        //this.openGreenSnackBar('Willkommen ' + data[0]['vorname'], 'Schließen');
        this.isAuthenticated.next(true);
        this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
      }
      else
      {

      }
    }, error => {

    })
  }

  async logout(redirect: string) {
    try {
      await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 4000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 4000, panelClass: ['red-snackbar']});
  }

}
