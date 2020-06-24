import { SkillService } from './../../Shared/Services/skill.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-skillverwaltung-close-dialog',
  templateUrl: './skillverwaltung-close-dialog.component.html',
  styleUrls: ['./skillverwaltung-close-dialog.component.css']
})
export class SkillverwaltungCloseDialogComponent implements OnInit {

  constructor(public dialogRefChild: MatDialogRef<SkillverwaltungCloseDialogComponent>,
              private matDialog: MatDialog, public skillService: SkillService) { }

  ngOnInit(): void {
  }

  onYes() {
    this.skillService.form.reset();
    this.skillService.initializeFormGroup();
    this.skillService.filter('Register click');
    this.matDialog.closeAll();
  }

  onNo() {
    this.dialogRefChild.close();
  }

}
