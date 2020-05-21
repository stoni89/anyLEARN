import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Shared/Services/user.service';

@Component({
  selector: 'app-benutzerverwaltung-new-user',
  templateUrl: './benutzerverwaltung-new-user.component.html',
  styleUrls: ['./benutzerverwaltung-new-user.component.css']
})
export class BenutzerverwaltungNewUserComponent implements OnInit {

  category: Array<any> = [
    {value: '0', viewValue: 'Technik'},
    {value: '1', viewValue: 'Kaufmännischer Mitarbeiter'},
    {value: '2', viewValue: 'Geschäftsführer'}
  ]

  constructor(public service: UserService, public dialogRef: MatDialogRef<BenutzerverwaltungNewUserComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
