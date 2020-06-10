import { SendMailService } from './Shared/Services/send-mail.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Observable } from 'rxjs';
import { PostService } from './Shared/Services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anyLEARN';
  navBarTitle = '';
  isMenuOpen = false;
  contentMargin = 200;
  isTooltipActive = true;

  userRole: string = localStorage.getItem('role');
  userName: string = localStorage.getItem('name');

  isAuthenticated: boolean;


  constructor(private adalService: MsAdalAngular6Service, public userService: UserService, public postService: PostService,
              private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar,
              public sendMailService: SendMailService) {
    // tslint:disable-next-line: no-shadowed-variable
  }

  ngOnInit() {
    const token = this.adalService.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
      this.userService.getSpezificUsersMail(this.adalService.LoggedInUserEmail).subscribe(data => {
        localStorage.setItem('istAktiv', data[0]['istAktiv']);
        localStorage.setItem('mail', data[0]['mail']);
        if (data[0]['mail'] === this.adalService.LoggedInUserEmail && data[0]['istAktiv'] === 1)
        {
          localStorage.setItem('role', data[0]['rolle']);
          localStorage.setItem('name', data[0]['name']);
          localStorage.setItem('userid', data[0]['user_id']);

          //localStorage.setItem('key', data[0]['user_id']);
          this.isAuthenticated = this.adalService.isAuthenticated;
          if (!this.isAuthenticated)
          {
            this.changeNavBarTitle('Logout');
          }
          else
          {
            const tempUserID = parseInt(localStorage.getItem('userid'));
            this.postService.getPostIDCount(tempUserID).subscribe(data => {
              localStorage.setItem('anzahl', data[0].anzahl);
            });
            this.changeNavBarTitle('Dashboard');
          }
        }
        else
        {
          this.openRedSnackBar('Account nicht aktiv!', 'Schließen');
          this.router.navigate(['/logout']);
        }
      });
    });
  }

  login(): void {
    /*
    this.userService.getSpezificUsersMail(localStorage.getItem('mail')).subscribe(data => {
      localStorage.setItem('istAktiv', data[0]['istAktiv']);
      if (localStorage.getItem('istAktiv') === '2')
      {
        this.openRedSnackBar('Account nicht aktiv!', 'Schließen');
        this.router.navigate(['/logout']);
      }
      else
      {
        this.adalService.login();
      }
    });
    */
    this.adalService.login();

  }

  logout(): void {
    this.adalService.logout();
  }


  changeNavBarTitle(navBarTitle: string) {
    this.navBarTitle = navBarTitle;
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

  onClick() {
  }
}
