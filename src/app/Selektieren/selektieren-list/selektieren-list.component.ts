import { SelektierenService } from './../../Shared/Services/selektieren.service';
import { UserService } from './../../Shared/Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selektieren-list',
  templateUrl: './selektieren-list.component.html',
  styleUrls: ['./selektieren-list.component.css']
})
export class SelektierenListComponent implements OnInit {

  users: any;
  selectUsers;
  format: Array<any> = [];
  data: any;

  constructor(public userService: UserService, public selectService: SelektierenService) { }

  ngOnInit() {
    this.userService.getAllUsersAktiv().subscribe(data => {
      this.users = data;
    });
  }

  onClick() {
    this.selectUsers.forEach(element => {
      this.format.push(element);
    });

    const Item: Array<{user_id: number}> = [{user_id: 1}];
    this.selectService.getSelectUserID(Item[0]).subscribe(data => {
      this.data = data;
    });

    console.log(this.data);
  }

}
