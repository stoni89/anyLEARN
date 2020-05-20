import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anyLEARN';
  navBarTitle = 'Dashboard';
  isMenuOpen = false;
  contentMargin = 200;
  isTooltipActive = true;

  changeNavBarTitle(navBarTitle: string) {
    this.navBarTitle = navBarTitle;
  }
}
