import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { DashboardService } from './../../Shared/Services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/Shared/Services/post.service';
import { formatDate } from '@angular/common';
import { LogsService } from 'src/app/Shared/Services/logs.service';

@Component({
  selector: 'app-dashboard-list-item',
  templateUrl: './dashboard-list-item.component.html',
  styleUrls: ['./dashboard-list-item.component.css']
})
export class DashboardListItemComponent implements OnInit {

  constructor(public dashboardService: DashboardService,
              public skillstatusService: SkillstatusService,
              public dialogRef: MatDialogRef<DashboardListItemComponent>,
              private snackbar: MatSnackBar,
              public postService: PostService,
              public logService: LogsService) {}

  ngOnInit() {
  }


  onClose() {
    this.dashboardService.form.reset();
    this.dashboardService.initializeFormGroup();
    this.dialogRef.close();
    this.skillstatusService.filter('Register click');
  }

  onBearbeitung() {
    console.log('Bearbeitung');
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

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
