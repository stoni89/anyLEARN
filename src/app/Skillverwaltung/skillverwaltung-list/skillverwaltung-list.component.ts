import { UserService } from './../../Shared/Services/user.service';
import { BereichService } from './../../Shared/Services/bereich.service';
import { SkillverwaltungLinksComponent } from './../skillverwaltung-links/skillverwaltung-links.component';
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
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';

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

  skillFilter = new FormControl(sessionStorage.getItem('skillverwFilterSkill'));
  vermittlerFilter = new FormControl(sessionStorage.getItem('skillverwFilterVermittler'));
  bereichFilter = new FormControl(sessionStorage.getItem('skillverwFilterBereich'));
  filterValues = {
    skill: sessionStorage.getItem('skillverwFilterSkill'),
    nachname: sessionStorage.getItem('skillverwFilterVermittler'),
    bereich: sessionStorage.getItem('skillverwFilterBereich')
  };
  bereich: any;
  users: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(private service: SkillService,
              private dialog: MatDialog,
              public bereichService: BereichService,
              public userService: UserService,
              public skillkategorieService: SkillkategorieService,
              public skillstatusService: SkillstatusService) {
    this.service.listen().subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.refreshSkillList();
    });

  }

  ngOnInit() {

    if (this.filterValues.bereich === null)
    {
      this.filterValues.bereich = "";
    }
    if (this.filterValues.skill === null)
    {
      this.filterValues.skill = "";
    }
    if (this.filterValues.nachname === null)
    {
      this.filterValues.nachname = "";
    }

    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.service.getAllSkills().subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;

      this.datasource.filterPredicate = this.createFilter();
      this.datasource.filter = JSON.stringify(this.filterValues);

      this.skillFilter.valueChanges.subscribe(skill => {
        sessionStorage.setItem('skillverwFilterSkill', skill);
        this.filterValues.skill = sessionStorage.getItem('skillverwFilterSkill');
        this.datasource.filter = JSON.stringify(this.filterValues);
      });

      this.vermittlerFilter.valueChanges.subscribe(vermittler => {
        sessionStorage.setItem('skillverwFilterVermittler', vermittler);
        if (sessionStorage.getItem('skillverwFilterVermittler') === 'undefined')
        {
          sessionStorage.setItem('skillverwFilterVermittler', '');
          this.filterValues.nachname = sessionStorage.getItem('skillverwFilterVermittler');
          this.datasource.filter = JSON.stringify(this.filterValues);
        }
        else
        {
          this.filterValues.nachname = sessionStorage.getItem('skillverwFilterVermittler');
          this.datasource.filter = JSON.stringify(this.filterValues);
        }
      });

      this.bereichFilter.valueChanges.subscribe(bereich => {
        sessionStorage.setItem('skillverwFilterBereich', bereich);
        if (sessionStorage.getItem('skillverwFilterBereich') === 'undefined')
        {
          sessionStorage.setItem('skillverwFilterBereich', '');
          this.filterValues.bereich = sessionStorage.getItem('skillverwFilterBereich');
          this.datasource.filter = JSON.stringify(this.filterValues);
        }
        else
        {
          this.filterValues.bereich = sessionStorage.getItem('skillverwFilterBereich');
          this.datasource.filter = JSON.stringify(this.filterValues);
        }
      });
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.skill.toLowerCase().indexOf(searchTerms.skill.toLowerCase()) !== -1
      && data.nachname.toLowerCase().indexOf(searchTerms.nachname.toLowerCase()) !== -1
      && data.bereich.toLowerCase().indexOf(searchTerms.bereich.toLowerCase()) !== -1;
    };
    return filterFunction;
  }

  refreshSkillList() {
    this.service.getAllSkills().subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      //this.applyFilter();

      this.datasource.filterPredicate = this.createFilter();
      this.datasource.filter = JSON.stringify(this.filterValues);


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
    dialogConfig.width = '90%';
    this.dialog.open(SkillverwaltungSkillItemComponent, dialogConfig);
  }

  onNew() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
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

  onLink(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '60%';
    dialogConfig.data = {skill: row.skill, skill_id: row.skill_id};
    this.dialog.open(SkillverwaltungLinksComponent, dialogConfig);
  }

  print() {
    const doc = new jsPDF();
    const data = [];

    this.datasource.filteredData.forEach(obj => {
      const arr = [];
      this.displayedColumns.forEach(col => {
        arr.push(obj[col]);
      });
      data.push(arr);
    });
    doc.autoTable({
      styles: { fontSize: [6] },
      head: [['Bereich', 'Skill' , 'Zeitpunkt', 'Zeitaufwand', 'Vermittler', 'Kategorie']],
      body: data
    });
    doc.save('Skills.pdf');
  }

}
