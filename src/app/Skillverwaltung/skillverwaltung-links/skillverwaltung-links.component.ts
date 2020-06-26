import { SkillverwaltungLinksItemComponent } from './skillverwaltung-links-item/skillverwaltung-links-item.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from 'src/app/Shared/Services/skill.service';
import { LinksService } from 'src/app/Shared/Services/links.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-skillverwaltung-links',
  templateUrl: './skillverwaltung-links.component.html',
  styleUrls: ['./skillverwaltung-links.component.css']
})
export class SkillverwaltungLinksComponent implements OnInit {

  datasource;
  displayedColumns = ['bezeichnung', 'url' , 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private snackbar: MatSnackBar, public dialogRef: MatDialogRef<SkillverwaltungLinksComponent>,
              public skillService: SkillService, public linksService: LinksService, @Inject(MAT_DIALOG_DATA) public data,
              private dialog: MatDialog) {
                this.linksService.listen().subscribe(async data => {
                  await new Promise(resolve => setTimeout(resolve, 500));
                  this.refreshSkillList();
                });
               }

  ngOnInit() {
    this.linksService.getSpezificLink(this.data.skill_id).subscribe(data2 => {
      this.datasource = new MatTableDataSource(data2 as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  refreshSkillList() {
    this.linksService.getSpezificLink(this.data.skill_id).subscribe(data2 => {
      this.datasource = new MatTableDataSource(data2 as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  onNew() {
    this.linksService.initializeFormGroup();
    this.linksService.form.patchValue({skill_id: this.data.skill_id});
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this.dialog.open(SkillverwaltungLinksItemComponent, dialogConfig);
  }

  onDelete(row) {
    this.linksService.removeLink(row.skilllink_id).subscribe(data => {
      this.openGreenSnackBar('Link gelöscht!', 'Schließen');
      this.linksService.filter('Register click');
    }, error => {
      this.openRedSnackBar('Fehler beim löschen!', 'Schließen');
    });
  }

  onClose() {
    this.dialogRef.close();
    this.skillService.filter('Register click');
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
