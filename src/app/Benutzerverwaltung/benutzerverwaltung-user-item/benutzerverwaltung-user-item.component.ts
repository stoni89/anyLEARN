import { UserCloseDialogComponent } from './../user-close-dialog/user-close-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Shared/Services/user.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';
import { RollenService } from 'src/app/Shared/Services/rollen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from 'src/app/Shared/Services/skill.service';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { formatDate } from '@angular/common';
import { LogsService } from 'src/app/Shared/Services/logs.service';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../AppDateAdapter';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-benutzerverwaltung-user-item',
  templateUrl: './benutzerverwaltung-user-item.component.html',
  styleUrls: ['./benutzerverwaltung-user-item.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class BenutzerverwaltungUserItemComponent implements OnInit {

  category: any;
  rollen: any;
  selectedItemName: string;
  editable = false;

  constructor(public userService: UserService,
              private dialog: MatDialog,
              public kategorieService: KategorieService,
              public rollenService: RollenService,
              public skillService: SkillService,
              public skillstatusService: SkillstatusService,
              public dialogRef: MatDialogRef<BenutzerverwaltungUserItemComponent>,
              private snackbar: MatSnackBar,
              public logService: LogsService) { }

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
  }

  onExit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '18%';
    this.dialog.open(UserCloseDialogComponent, dialogConfig);
  }

  onSubmit() {
    const formatdate: string = moment(this.userService.form.value.eintritt).format('YYYY-MM-DD');
    this.userService.form.patchValue({eintritt: formatdate});

    if (this.userService.form.valid) {
      if (!this.userService.form.get('user_id').value) {

        console.log(this.userService.form.value);

        this.userService.setUser(this.userService.form.value).subscribe(data => {

          console.log('2');

          this.userService.getLastUserID().subscribe(da => {

            console.log('3');

            // tslint:disable-next-line: no-shadowed-variable
            this.skillService.getAllSkills().subscribe(data => {
              const arr = [];
              // tslint:disable-next-line: forin
              for (const i in data)
              {
                arr.push(i);
              }

              arr.forEach(element => {
                const statusitem: Array<{ skill_id: number, user_id: number, status_id: number, vermittler_id: number}> = [
                  { skill_id: data[element].skill_id, user_id: da[0].user_id, status_id: 1, vermittler_id: data[element].vermittler_id}];
                this.skillstatusService.setSkillStatus(statusitem[0]).subscribe();
              });
            });
          });

          const verItem: Array<{vermittler_id: number, skill_id: number}> = [{vermittler_id: this.skillService.form.value.vermittler_id,
                                                                              skill_id: this.skillService.form.value.skill_id}];
          this.skillstatusService.updateVermittlerSkillStatus(verItem[0]).subscribe();

          const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
          const logitem: Array<{ eintrag: string, date: string, user_id: number, art: string, cat_id: number}> = [
            {
            eintrag: 'Der Benutzer "' + this.userService.form.value.name + '" wurde erstellt',
            // tslint:disable-next-line: object-literal-shorthand
            date: date,
            // tslint:disable-next-line: radix
            user_id: parseInt(localStorage.getItem('userid')),
            art: 'Benutzer',
            cat_id: 1
            }
          ];

          this.logService.newLogs(logitem[0]).subscribe();
          this.openGreenSnackBar('Neuer User wurde angelegt!', 'Schließen');
          this.onClose();

        }, error => {
          this.openRedSnackBar('Fehler beim anlegen!', 'Schließen');
        });
      }
      else {
        this.userService.updateUser(this.userService.form.value).subscribe(data => {
          this.openGreenSnackBar('Erfolgreich angepasst!!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anpassen!', 'Schließen');
        });

        const verItem: Array<{vermittler_id: number, skill_id: number}> = [{vermittler_id: this.skillService.form.value.vermittler_id,
                                                                            skill_id: this.skillService.form.value.skill_id}];
        this.skillstatusService.updateVermittlerSkillStatus(verItem[0]).subscribe();

        const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
        const logitem: Array<{ eintrag: string, date: string, user_id: number, art: string, cat_id: number}> = [
          {
            eintrag: 'Der Benutzer "' + this.userService.form.value.name + '" wurde angepasst',
            // tslint:disable-next-line: object-literal-shorthand
            date: date,
            // tslint:disable-next-line: radix
            user_id: parseInt(localStorage.getItem('userid')),
            art: 'Benutzer',
            cat_id: 2
          }
        ];

        this.logService.newLogs(logitem[0]).subscribe();

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
