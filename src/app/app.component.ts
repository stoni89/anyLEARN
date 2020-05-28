import { Component, OnInit } from '@angular/core';
import { AuthService } from './Shared/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anyLEARN';
  navBarTitle = 'Login';
  isMenuOpen = false;
  contentMargin = 200;
  isTooltipActive = true;

  userRole: string = localStorage.getItem('role');

  isAuthenticated: boolean;

  constructor(public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();

    if (!this.isAuthenticated)
    {
      this.changeNavBarTitle('Login')
    }
    else
    {
      this.changeNavBarTitle('Dashboard')
    }
  }

  logout() {
    this.changeNavBarTitle('Login')
    this.authService.logout('/login');
  }

  changeNavBarTitle(navBarTitle: string) {
    this.navBarTitle = navBarTitle;
  }
}
