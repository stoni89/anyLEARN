import { SkillverwaltungCloseDialogComponent } from './../skillverwaltung-close-dialog/skillverwaltung-close-dialog.component';
import { ZeitpunktService } from './../../Shared/Services/zeitpunkt.service';
import { Component, OnInit} from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SkillService } from '../../Shared/Services/skill.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';
import { BereichService } from 'src/app/Shared/Services/bereich.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Shared/Services/user.service';
import { SkillkategorieService } from 'src/app/Shared/Services/skillkategorie.service';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { formatDate } from '@angular/common';
import { LogsService } from 'src/app/Shared/Services/logs.service';

@Component({
  selector: 'app-skillverwaltung-skill-item',
  templateUrl: './skillverwaltung-skill-item.component.html',
  styleUrls: ['./skillverwaltung-skill-item.component.css']
})
export class SkillverwaltungSkillItemComponent implements OnInit {
  category: any;
  bereich: any;
  vermittler: any;
  zeitpunkt: any;
  endzeitpunkt: any;
  skillkategorie: any;
  selectedItemName: string;
  selectedSkillKategorie = new Array<any>();
  selected = new Array<number>();
  public tempSkillID;
  public tempID;

  constructor(private snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<SkillverwaltungSkillItemComponent>,
              public bereichService: BereichService,
              public userService: UserService,
              private dialog: MatDialog,
              public kategorieService: KategorieService,
              public skillstatusService: SkillstatusService,
              public skillkategorieService: SkillkategorieService,
              public skillService: SkillService,
              public zeitpunktService: ZeitpunktService,
              public logService: LogsService) {}


  ngOnInit() {
    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.vermittler = data;
    });

    this.kategorieService.getAllKategorie().subscribe(data => {
      this.category = data;
    });

    this.zeitpunktService.getAllZeitpunkt().subscribe(data => {
      this.zeitpunkt = data;
    });

    this.zeitpunktService.getAllEndZeitpunkt().subscribe(data => {
      this.endzeitpunkt = data;
    });

    this.selectedItemName = this.skillService.form.value.skill;

    if (this.skillService.form.get('skill_id').value)
    {
      this.skillkategorieService.getSpezificSkillKategorie(this.skillService.form.value.skill_id).subscribe(data => {
        let selectString: string;
        let stringConvert: any[];
        selectString = data[0].kategorie_id;
        stringConvert = selectString.split(', ');

        // tslint:disable-next-line: forin
        for (const i in stringConvert) {
          const obj = {ID: stringConvert[i]};
          this.selectedSkillKategorie.push(obj);
        }

        const arr = [];
        this.selectedSkillKategorie.forEach(element => {
            // tslint:disable-next-line: radix
            const convert = parseInt(element.ID);
            arr.push(convert);
        });

        this.selected = arr;
      });
    }
  }

  onClose() {
    this.skillService.form.reset();
    this.skillService.initializeFormGroup();
    this.dialogRef.close();
    this.skillService.filter('Register click');
  }

  onExit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '18%';
    this.dialog.open(SkillverwaltungCloseDialogComponent, dialogConfig);
  }

  onSubmit() {
    console.log(this.skillService.form.value);
    if (this.skillService.form.valid) {
      if (!this.skillService.form.get('skill_id').value) {
        this.skillService.setSkill(this.skillService.form.value).subscribe(data => {
          const vermitID = this.skillService.form.value.vermittler_id;

          this.skillService.getLastSkillID().subscribe(da => {
            this.selected.forEach(element => {
              const item: Array<{ skill_id: number, kategorie_id: number}> = [{ skill_id: da[0].skill_id, kategorie_id: element}];
              this.skillkategorieService.setSkillKategorie(item[0]).subscribe();
            });

            // tslint:disable-next-line: no-shadowed-variable
            this.userService.getAllUsers().subscribe(data => {
              const arr = [];
              // tslint:disable-next-line: forin
              for (const i in data)
              {
                arr.push(i);
              }

              arr.forEach(element => {
                const statusitem: Array<{ skill_id: number, user_id: number, status_id: number, vermittler_id: number,
                                          ueberschritten: string}> = [
                  { skill_id: da[0].skill_id, user_id: data[element].user_id, status_id: 1, vermittler_id: vermitID,
                    ueberschritten: 'false'}];
                this.skillstatusService.setSkillStatus(statusitem[0]).subscribe();
              });
            });
          });

          const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
          const logitem: Array<{ eintrag: string, date: string, user_id: number, art: string, cat_id: number}> = [
            {
              eintrag: 'Der Skill "' + this.skillService.form.value.skill + '" wurde erstellt',
              // tslint:disable-next-line: object-literal-shorthand
              date: date,
              // tslint:disable-next-line: radix
              user_id: parseInt(localStorage.getItem('userid')),
              art: 'Skill',
              cat_id: 4
            }
          ];

          this.logService.newLogs(logitem[0]).subscribe();
          this.openGreenSnackBar('Neuer Skill wurde angelegt!', 'Schließen');
          this.onClose();

        }, error => {
          this.openRedSnackBar('Fehler beim anlegen!', 'Schließen');
        });
      }
      else {
        this.skillService.updateSkill(this.skillService.form.value).subscribe(data => {
          this.openGreenSnackBar('Erfolgreich angepasst!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anpassen!', 'Schließen');
        });

        this.skillkategorieService.removeSkillKategorie(this.skillService.form.value.skill_id).subscribe();

        setTimeout(() => {
          this.selected.forEach(element => {
            // tslint:disable-next-line: max-line-length
            const item: Array<{ skill_id: number, kategorie_id: number}> = [{ skill_id: this.skillService.form.value.skill_id, kategorie_id: element}];
            this.skillkategorieService.setSkillKategorie(item[0]).subscribe();
          });

          const verItem: Array<{vermittler_id: number, skill_id: number}> = [{vermittler_id: this.skillService.form.value.vermittler_id,
                                                                              skill_id: this.skillService.form.value.skill_id}];
          this.skillstatusService.updateVermittlerSkillStatus(verItem[0]).subscribe();

          const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
          const logitem: Array<{ eintrag: string, date: string, user_id: number, art: string, cat_id: number}> = [
            {
              eintrag: 'Der Skill "' + this.skillService.form.value.skill + '" wurde angepasst',
              // tslint:disable-next-line: object-literal-shorthand
              date: date,
              // tslint:disable-next-line: radix
              user_id: parseInt(localStorage.getItem('userid')),
              art: 'Skill',
              cat_id: 5
            }
          ];

          this.logService.newLogs(logitem[0]).subscribe();

          this.onClose();
        },
        500);
      }
    }
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

  getTempID() {
    this.skillService.getLastSkillID().subscribe(data => {
      this.tempSkillID = data;
      return this.tempSkillID;
    });
  }
}
