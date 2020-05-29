import { UserService } from 'src/app/Shared/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Observable } from 'rxjs';
import { PostService } from './Shared/Services/post.service';
import { GlobalApp } from './global';

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

  isAuthenticated: boolean;

  constructor(private adalService: MsAdalAngular6Service, public userService: UserService, public postService: PostService) {
    // tslint:disable-next-line: no-shadowed-variable
  }

  ngOnInit() {
    const token = this.adalService.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
      this.userService.getSpezificUsersMail(this.adalService.LoggedInUserEmail).subscribe(data => {
        if (data[0]['mail'] === this.adalService.LoggedInUserEmail)
        {
          localStorage.setItem('role', data[0]['rolle']);
          localStorage.setItem('name', data[0]['name']);
          localStorage.setItem('userid', data[0]['user_id']);
          localStorage.setItem('key', data[0]['user_id']);
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
            })
            this.changeNavBarTitle('Dashboard');
          }
        }
      });
    });
  }

  login(): void {
    this.adalService.login();
  }

  logout(): void {
    this.adalService.logout();
  }


  changeNavBarTitle(navBarTitle: string) {
    this.navBarTitle = navBarTitle;
  }
}
