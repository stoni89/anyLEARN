import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Shared/Services/user.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';
import { RollenService } from 'src/app/Shared/Services/rollen.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-benutzerverwaltung-user-item',
  templateUrl: './benutzerverwaltung-user-item.component.html',
  styleUrls: ['./benutzerverwaltung-user-item.component.css']
})
export class BenutzerverwaltungUserItemComponent implements OnInit {

  category: any;
  rollen: any;
  selectedItemName: string;
  editable = false;

  constructor(public userService: UserService,
              public kategorieService: KategorieService,
              public rollenService: RollenService,
              public dialogRef: MatDialogRef<BenutzerverwaltungUserItemComponent>,
              private snackbar: MatSnackBar) { }

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
    this.userService.filter('Register click');
  };

  onSubmit() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('user_id').value) {
        this.userService.setUser(this.userService.form.value).subscribe(data => {
          this.openGreenSnackBar('Neuer User wurde angelegt!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anlegen!', 'Schließen');
        });

        this.onClose();
      }
      else {
        this.userService.updateUser(this.userService.form.value).subscribe(data => {
          this.openGreenSnackBar('Erfolgreich angepasst!!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anpassen!', 'Schließen');
        });

        this.onClose();
      }
    }
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }


}
