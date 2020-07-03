import { UeberschrittenService } from './../../Shared/Services/ueberschritten.service';
import { PostService } from './../../Shared/Services/post.service';
import { DashboardService } from './../../Shared/Services/dashboard.service';
import { StatusService } from './../../Shared/Services/status.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-status-change-item',
  templateUrl: './status-change-item.component.html',
  styleUrls: ['./status-change-item.component.css']
})
export class StatusChangeItemComponent implements OnInit {

  status: any;
  selectStatus;

  constructor(public dialogRef: MatDialogRef<StatusChangeItemComponent>, @Inject(MAT_DIALOG_DATA) public data,
              public statusService: StatusService, public skillstatusService: SkillstatusService,
              public dashboardService: DashboardService, public postService: PostService, private snackbar: MatSnackBar,
              public ueberschrittenService: UeberschrittenService) { }

  ngOnInit() {
    this.statusService.getAllStatus().subscribe(data => {
      this.status = data;
    });

    this.selectStatus = this.data.status_id;
  }

  onSetStatus() {
    const item: Array<{ skillstatus_id: number, status_id: number}> = [{ skillstatus_id: this.data.skillstatus_id,
                                                                         status_id: this.selectStatus}];
    this.skillstatusService.updateSkillStatus(item[0]).subscribe(data => {
      this.openGreenSnackBar('Status geändert!', 'Schließen');
    }, error => {
      this.openRedSnackBar('Änderung fehlgeschlagen!', 'Schließen');
    });

    const skill = this.data.skill;
    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const newItem: Array<{date: string, text: string, user_id: number, fromuser_id: number, skill_id: number,
                          kategorie: string, bemerkung: string, skillstatus_id: number}> = [
      {
        // tslint:disable-next-line: object-literal-shorthand
        date: date,
        text: 'Der Status vom Skill "' + skill + '" wurde angepasst',
        user_id: this.data.user_id,
        fromuser_id: parseInt(localStorage.getItem('userid')),
        skill_id: this.data.skill_id,
        kategorie: 'Information',
        bemerkung: null,
        skillstatus_id: this.data.skillstatus_id
      }
    ];

    this.ueberschrittenService.updateStart().subscribe();
    this.ueberschrittenService.updateEnd().subscribe();
    this.ueberschrittenService.updateStartFalse().subscribe();
    this.ueberschrittenService.updateEndFalse().subscribe();

    this.postService.newPost(newItem[0]).subscribe();

    this.onClose();
  }


  onClose() {
    this.dialogRef.close();
    this.skillstatusService.filter('Register click');
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }
}
