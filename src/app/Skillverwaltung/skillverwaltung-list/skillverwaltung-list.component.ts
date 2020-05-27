import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SkillService } from '../../Shared/Services/skill.service';
import { SkillverwaltungSkillItemComponent } from '../skillverwaltung-skill-item/skillverwaltung-skill-item.component';

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


  constructor(private service: SkillService, private dialog: MatDialog) {
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
    dialogConfig.height = '77%';
    this.dialog.open(SkillverwaltungSkillItemComponent, dialogConfig);
  }

  onNew() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '77%';
    this.dialog.open(SkillverwaltungSkillItemComponent, dialogConfig);
  }



}
