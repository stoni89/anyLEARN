import { DashboardCloseDialogComponent } from './../dashboard-close-dialog/dashboard-close-dialog.component';
import { UserService } from 'src/app/Shared/Services/user.service';
import { BereichService } from 'src/app/Shared/Services/bereich.service';
import { ZeitpunktService } from './../../Shared/Services/zeitpunkt.service';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { DashboardService } from './../../Shared/Services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/Shared/Services/post.service';
import { formatDate } from '@angular/common';
import { LogsService } from 'src/app/Shared/Services/logs.service';
import { LinksService } from 'src/app/Shared/Services/links.service';
import { SkillService } from 'src/app/Shared/Services/skill.service';

@Component({
  selector: 'app-dashboard-list-item',
  templateUrl: './dashboard-list-item.component.html',
  styleUrls: ['./dashboard-list-item.component.css']
})
export class DashboardListItemComponent implements OnInit {

  links;
  zeitpunkt: any;
  endzeitpunkt: any;
  bereich: any;
  vermittler: any;
  userRole: string = localStorage.getItem('role');

  constructor(public dashboardService: DashboardService,
              public skillstatusService: SkillstatusService,
              public dialogRef: MatDialogRef<DashboardListItemComponent>,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              public postService: PostService,
              public bereichService: BereichService,
              public userService: UserService,
              public logService: LogsService,
              public skillService: SkillService,
              public linksService: LinksService,
              public zeitpunktService: ZeitpunktService) {}

  ngOnInit() {
    this.zeitpunktService.getAllZeitpunkt().subscribe(data => {
      this.zeitpunkt = data;
    });

    this.zeitpunktService.getAllEndZeitpunkt().subscribe(data => {
      this.endzeitpunkt = data;
    });

    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.vermittler = data;
    });
  }


  onClose() {
    this.dashboardService.form.reset();
    this.dashboardService.initializeFormGroup();
    this.dialogRef.close();
    this.skillstatusService.filter('Register click');
  }

  onExit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '18%';
    this.dialog.open(DashboardCloseDialogComponent, dialogConfig);
  }

  onBearbeitung() {
    const item: Array<{ skillstatus_id: number, status_id: number}> =
          [{ skillstatus_id: this.dashboardService.form.value.skillstatus_id, status_id: 2}];
    this.skillstatusService.updateSkillStatus(item[0]).subscribe(data => {
      this.openGreenSnackBar('Gestartet!', 'Schließen');
    }, error => {
      this.openRedSnackBar('Konnte nicht gestartet werden!', 'Schließen');
    });

    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const skill = this.dashboardService.form.value.skill;
    const newItem: Array<{date: string, text: string, user_id: number, fromuser_id: number, skill_id: number,
                          kategorie: string, bemerkung: string, skillstatus_id: number}> = [
      {
        // tslint:disable-next-line: object-literal-shorthand
        date: date,
        text: 'Der Skill "' + skill + '" wurde gestartet',
        user_id: this.dashboardService.form.value.verID,
        fromuser_id: this.dashboardService.form.value.user_id,
        skill_id: this.dashboardService.form.value.skill_id,
        kategorie: 'Information',
        bemerkung: null,
        skillstatus_id: this.dashboardService.form.value.skillstatus_id
      }
    ];

    this.postService.newPost(newItem[0]).subscribe();
    this.postService.updateBadge();

    this.onClose();
  }

  onErledigt() {
    // tslint:disable-next-line: max-line-length
    const item: Array<{ skillstatus_id: number, status_id: number}> = [{ skillstatus_id: this.dashboardService.form.value.skillstatus_id, status_id: 3}];
    this.skillstatusService.updateSkillStatus(item[0]).subscribe(data => {
      this.openGreenSnackBar('Anfrage wurde gesendet!', 'Schließen');
    }, error => {
      this.openRedSnackBar('Fehlgeschlagen!', 'Schließen');
    });

    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const skill = this.dashboardService.form.value.skill;
    const newItem: Array<{date: string, text: string, user_id: number, fromuser_id: number, skill_id: number,
                          kategorie: string, bemerkung: string, skillstatus_id: number}> = [
      {
        // tslint:disable-next-line: object-literal-shorthand
        date: date,
        text: 'Abschluss für den Skill "' + skill + '" wurde beantragt',
        user_id: this.dashboardService.form.value.verID,
        fromuser_id: this.dashboardService.form.value.user_id,
        skill_id: this.dashboardService.form.value.skill_id,
        kategorie: 'Genehmigung',
        bemerkung: null,
        skillstatus_id: this.dashboardService.form.value.skillstatus_id
      }
    ];

    this.postService.newPost(newItem[0]).subscribe();
    this.postService.updateBadge();

    this.onClose();
  }

  onSave() {
    this.skillService.updateSkill(this.dashboardService.form.value).subscribe(data => {
      this.openGreenSnackBar('Erfolgreich angepasst!', 'Schließen');
    }, error => {
      this.openRedSnackBar('Fehler beim anpassen!', 'Schließen');
    });

    const verItem: Array<{vermittler_id: number, skill_id: number}> = [{vermittler_id: this.dashboardService.form.value.vermittler_id,
                                                                        skill_id: this.dashboardService.form.value.skill_id}];
    this.skillstatusService.updateVermittlerSkillStatus(verItem[0]).subscribe();

    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const logitem: Array<{ eintrag: string, date: string, user_id: number, art: string, cat_id: number}> = [
      {
        eintrag: 'Der Skill "' + this.dashboardService.form.value.skill + '" wurde angepasst',
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
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
