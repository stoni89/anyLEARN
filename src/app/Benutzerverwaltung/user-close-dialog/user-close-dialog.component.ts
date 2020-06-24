import { UserService } from './../../Shared/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-close-dialog',
  templateUrl: './user-close-dialog.component.html',
  styleUrls: ['./user-close-dialog.component.css']
})
export class UserCloseDialogComponent implements OnInit {

  constructor(private matDialog: MatDialog,
              public dialogRefChild: MatDialogRef<UserCloseDialogComponent>,
              public userService: UserService) { }

  ngOnInit(): void {
  }

  onYes() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.userService.filter('Register click');
    this.matDialog.closeAll();
  }

  onNo() {
    this.dialogRefChild.close();
  }

}
