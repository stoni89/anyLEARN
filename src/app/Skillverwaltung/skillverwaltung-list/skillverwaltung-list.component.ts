import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SkillService } from '../../Shared/Services/skill.service';
import { SkillverwaltungSkillItemComponent } from '../skillverwaltung-skill-item/skillverwaltung-skill-item.component';
import { SkillkategorieService } from 'src/app/Shared/Services/skillkategorie.service';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { SkillverwaltungSkillRemoveComponent } from '../skillverwaltung-skill-remove/skillverwaltung-skill-remove.component';

@Component({
  selector: 'app-skillverwaltung-list',
  templateUrl: './skillverwaltung-list.component.html',
  styleUrls: ['./skillverwaltung-list.component.css']
})
export class SkillverwaltungListComponent implements OnInit {
  selectedKatIDS: string;
  currentData: any;
  datasource;
  displayedColumns = ['bereich', 'skill' , 'zeitpunkt', 'zeitaufwand', 'nachname', 'kategorie', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(private service: SkillService,
              private dialog: MatDialog,
              public skillkategorieService: SkillkategorieService,
              public skillstatusService: SkillstatusService) {
    this.service.listen().subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.refreshSkillList();
    });
  }

  ngOnInit() {
    this.service.getAllSkills().subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });

  }

  refreshSkillList() {
    this.service.getAllSkills().subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row) {
    this.selectedKatIDS = row.kategorie_id;
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    //dialogConfig.height = '100%';
    this.dialog.open(SkillverwaltungSkillItemComponent, dialogConfig);
  }

  onNew() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    //dialogConfig.height = '100%';
    this.dialog.open(SkillverwaltungSkillItemComponent, dialogConfig);
  }

  onDelete(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '30%';
    dialogConfig.data = {skill: row.skill, skill_id: row.skill_id};
    this.dialog.open(SkillverwaltungSkillRemoveComponent, dialogConfig);
  }

}
