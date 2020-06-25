import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-skillverwaltung-skillstatus-dialog',
  templateUrl: './skillverwaltung-skillstatus-dialog.component.html',
  styleUrls: ['./skillverwaltung-skillstatus-dialog.component.css']
})
export class SkillverwaltungSkillstatusDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SkillverwaltungSkillstatusDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private dialog: MatDialog) { }

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close();
  }

}
