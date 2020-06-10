import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LinksService } from 'src/app/Shared/Services/links.service';

@Component({
  selector: 'app-skillverwaltung-links-item',
  templateUrl: './skillverwaltung-links-item.component.html',
  styleUrls: ['./skillverwaltung-links-item.component.css']
})
export class SkillverwaltungLinksItemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SkillverwaltungLinksItemComponent>, private snackbar: MatSnackBar,
              public linksService: LinksService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.linksService.form.reset();
    this.linksService.initializeFormGroup();
    this.dialogRef.close();
    this.linksService.filter('Register click');
  }

  onSubmit() {
    this.linksService.newLink(this.linksService.form.value).subscribe(data => {
      this.openGreenSnackBar('Neuer Link wurde angelegt!', 'Schließen');
    }, error => {
      this.openRedSnackBar('Fehler beim anlegen!', 'Schließen');
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
