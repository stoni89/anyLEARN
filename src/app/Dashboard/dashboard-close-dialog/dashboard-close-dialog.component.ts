import { SkillstatusService } from './../../Shared/Services/skillstatus.service';
import { DashboardService } from './../../Shared/Services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-close-dialog',
  templateUrl: './dashboard-close-dialog.component.html',
  styleUrls: ['./dashboard-close-dialog.component.css']
})
export class DashboardCloseDialogComponent implements OnInit {

  constructor(private matDialog: MatDialog,
              public dialogRefChild: MatDialogRef<DashboardCloseDialogComponent>,
              public dashboardService: DashboardService,
              public skillstatusService: SkillstatusService) { }

  ngOnInit(): void {
  }

  onYes() {
    this.dashboardService.form.reset();
    this.dashboardService.initializeFormGroup();
    this.skillstatusService.filter('Register click');
    this.matDialog.closeAll();
  }

  onNo() {
    this.dialogRefChild.close();
  }

}
