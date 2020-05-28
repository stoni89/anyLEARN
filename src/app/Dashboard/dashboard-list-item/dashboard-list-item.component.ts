import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { DashboardService } from './../../Shared/Services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-list-item',
  templateUrl: './dashboard-list-item.component.html',
  styleUrls: ['./dashboard-list-item.component.css']
})
export class DashboardListItemComponent implements OnInit {

  constructor(public dashboardService: DashboardService,
              public skillstatusService: SkillstatusService,
              public dialogRef: MatDialogRef<DashboardListItemComponent>,
              private snackbar: MatSnackBar) {
              }

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

    this.onClose();
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
