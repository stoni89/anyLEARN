import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../Shared/Services/skill.service';
import { KategorieService } from 'src/app/Shared/Services/kategorie.service';
import { BereichService } from 'src/app/Shared/Services/bereich.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Shared/Services/user.service';
import { SkillkategorieService } from 'src/app/Shared/Services/skillkategorie.service';

@Component({
  selector: 'app-skillverwaltung-skill-item',
  templateUrl: './skillverwaltung-skill-item.component.html',
  styleUrls: ['./skillverwaltung-skill-item.component.css']
})
export class SkillverwaltungSkillItemComponent implements OnInit {

  category: any;
  arr: any;
  bereich: any;
  vermittler: any;
  skillkategorie: any;
  selectedItemName: string;
  selectedSkillKategorie: any;

  constructor(private snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<SkillverwaltungSkillItemComponent>,
              public bereichService: BereichService,
              public userService: UserService,
              public kategorieService: KategorieService,
              public skillkategorieService: SkillkategorieService,
              public skillService: SkillService) {}


  ngOnInit() {

    console.log('OnInit wird gestartet');

    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.vermittler = data;
    });

    this.kategorieService.getAllKategorie().subscribe(data => {
      this.category = data;
    });

    this.selectedItemName = this.skillService.form.value.skill;
    this.selectedSkillKategorie = this.skillService.form.value.kategorie_id;

  }

  onClose() {
    this.skillService.form.reset();
    this.skillService.initializeFormGroup();
    this.dialogRef.close();
    this.skillService.filter('Register click');
  }

  onSubmit() {
    if (this.skillService.form.valid) {
      if (!this.skillService.form.get('skill_id').value) {
        this.skillService.setSkill(this.skillService.form.value).subscribe(data => {
          this.openGreenSnackBar('Neuer Skill wurde angelegt!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anlegen!', 'Schließen');
        });

        this.onClose();
      }
      else {
        this.skillService.updateSkill(this.skillService.form.value).subscribe(data => {
          this.openGreenSnackBar('Erfolgreich angepasst!', 'Schließen');
        }, error => {
          this.openRedSnackBar('Fehler beim anpassen!', 'Schließen');
        });

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
