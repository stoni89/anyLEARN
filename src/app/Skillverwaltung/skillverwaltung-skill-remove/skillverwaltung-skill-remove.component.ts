import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from 'src/app/Shared/Services/skill.service';
import { SkillkategorieService } from 'src/app/Shared/Services/skillkategorie.service';
import { HoldableDirective } from 'src/app/Shared/Directive/holdable.directive';

@Component({
  selector: 'app-skillverwaltung-skill-remove',
  templateUrl: './skillverwaltung-skill-remove.component.html',
  styleUrls: ['./skillverwaltung-skill-remove.component.css']
})
export class SkillverwaltungSkillRemoveComponent implements OnInit {

  counter: number = 0;

  constructor(public dialogRef: MatDialogRef<SkillverwaltungSkillRemoveComponent>, @Inject(MAT_DIALOG_DATA) public data,
              public skillstatusService: SkillstatusService, public skillService: SkillService,
              public skillkategorieService: SkillkategorieService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
    this.skillService.filter('Register click');
  }

  onDelete() {
    const skillID = this.data.skill_id;
    this.skillService.removeSkill(skillID).subscribe();
    this.skillkategorieService.removeSkillKategorie(skillID).subscribe();
    this.skillstatusService.removeSkillStatus(skillID).subscribe();
    this.openGreenSnackBar('Gelöscht!', 'Schließen');
    this.onClose();
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

  holdHandler(e) {
    this.counter = e / 1000;
    if (e > 2000)
    {
      this.counter = 0;
      const skillID = this.data.skill_id;
      this.skillService.removeSkill(skillID).subscribe();
      this.skillkategorieService.removeSkillKategorie(skillID).subscribe();
      this.skillstatusService.removeSkillStatus(skillID).subscribe();
      this.openGreenSnackBar('Gelöscht!', 'Schließen');
      this.onClose();
    }
  }

}
