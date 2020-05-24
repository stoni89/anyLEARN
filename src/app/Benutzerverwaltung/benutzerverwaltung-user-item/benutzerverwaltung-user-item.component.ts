import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Shared/Services/user.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';
import { RollenService } from 'src/app/Shared/Services/rollen.service';

@Component({
  selector: 'app-benutzerverwaltung-user-item',
  templateUrl: './benutzerverwaltung-user-item.component.html',
  styleUrls: ['./benutzerverwaltung-user-item.component.css']
})
export class BenutzerverwaltungUserItemComponent implements OnInit {

  category: any;
  rollen: any;
  selectedItemName: string;

  constructor(public userService: UserService,
              public kategorieService: KategorieService,
              public rollenService: RollenService,
              public dialogRef: MatDialogRef<BenutzerverwaltungUserItemComponent>) { }

  ngOnInit() {
    this.kategorieService.getAllKategorie().subscribe(data => {
      this.category = data;
    });

    this.rollenService.getAllRollen().subscribe(data => {
      this.rollen = data;
    });

    this.selectedItemName = this.userService.form.value.name;
  };

  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
  }

}
