import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Shared/Services/user.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';

@Component({
  selector: 'app-benutzerverwaltung-new-user',
  templateUrl: './benutzerverwaltung-new-user.component.html',
  styleUrls: ['./benutzerverwaltung-new-user.component.css']
})
export class BenutzerverwaltungNewUserComponent implements OnInit {

  category: any;

  constructor(public userService: UserService, public kategorieService: KategorieService, public dialogRef: MatDialogRef<BenutzerverwaltungNewUserComponent>) { }

  ngOnInit() {
    this.kategorieService.getAllKategorie().subscribe(data => {
      console.log(data);
      this.category = data;
    })
  };

  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
  }

}
