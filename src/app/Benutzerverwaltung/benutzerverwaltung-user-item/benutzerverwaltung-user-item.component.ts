import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Shared/Services/user.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';
import { RollenService } from 'src/app/Shared/Services/rollen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from 'src/app/Shared/Services/skill.service';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';

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
              public skillService: SkillService,
              public skillstatusService: SkillstatusService,
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
  }

  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
    this.userService.filter('Register click');
  };

  onSubmit() {
    console.log(this.userService.form.value);
    if (this.userService.form.valid) {
      if (!this.userService.form.get('user_id').value) {
        this.userService.setUser(this.userService.form.value).subscribe(data => {
          this.openGreenSnackBar('Neuer User wurde angelegt!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anlegen!', 'Schließen');
        });

        setTimeout(() => {
          this.userService.getLastUserID(this.userService.form.value.nachname).subscribe(da => {

            this.skillService.getAllSkills().subscribe(data => {
              const arr = [];
              // tslint:disable-next-line: forin
              for (const i in data)
              {
                arr.push(i);
              }

              arr.forEach(element => {
                const statusitem: Array<{ skill_id: number, user_id: number, status_id: number}> = [
                  { skill_id: data[element].skill_id, user_id: da[0].user_id, status_id: 1}];
                this.skillstatusService.setSkillStatus(statusitem[0]).subscribe();
              });
            });
          });

          this.onClose();
       },
       500);
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
