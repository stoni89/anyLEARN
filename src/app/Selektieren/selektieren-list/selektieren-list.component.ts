import { StatusService } from './../../Shared/Services/status.service';
import { BereichService } from './../../Shared/Services/bereich.service';
import { SkillstatusService } from './../../Shared/Services/skillstatus.service';
import { SelektierenStatusChangeComponent } from './../selektieren-status-change/selektieren-status-change.component';
import { SelektierenService } from './../../Shared/Services/selektieren.service';
import { UserService } from './../../Shared/Services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-selektieren-list',
  templateUrl: './selektieren-list.component.html',
  styleUrls: ['./selektieren-list.component.css']
})
export class SelektierenListComponent implements OnInit {

  users: any;
  selectUsers = new Array<number>();
  format: Array<number> = [];
  dataTable: any;
  data;
  completeArray: Array<any> = [];
  datasource;
  displayedColumns = ['bereich', 'skill', 'status', 'nachname', 'zeitpunkt', 'endzeitpunkt', 'zeitaufwand', 'vermittler'];

  skillFilter = new FormControl(sessionStorage.getItem('selektierenFilterSkill'));
  vermittlerFilter = new FormControl(sessionStorage.getItem('selektierenFilterVermittler'));
  bereichFilter = new FormControl(sessionStorage.getItem('selektierenFilterBereich'));
  statusFilter = new FormControl(sessionStorage.getItem('selektierenFilterStatus'));
  filterValues = {
    skill: sessionStorage.getItem('selektierenFilterSkill'),
    vermittler: sessionStorage.getItem('selektierenFilterVermittler'),
    bereich: sessionStorage.getItem('selektierenFilterBereich'),
    status: sessionStorage.getItem('selektierenFilterStatus')
  };
  bereich: any;
  status: any;
  vermittler: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public userService: UserService, public selectService: SelektierenService,
              public skillstatusService: SkillstatusService, private dialog: MatDialog,
              public bereichService: BereichService, public statusService: StatusService) {
    this.skillstatusService.listen().subscribe(async data => {
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
    if (this.filterValues.vermittler === null)
    {
      this.filterValues.vermittler = "";
    }
    if (this.filterValues.status === null)
    {
      this.filterValues.status = "";
    }


    this.userService.getAllUsersAzubi().subscribe(data => {
      this.users = data;
    });

    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.statusService.getAllStatus().subscribe(data => {
      this.status = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.vermittler = data;
    });

    this.datasource = new MatTableDataSource();

    this.skillFilter.valueChanges.subscribe(skill => {
      sessionStorage.setItem('selektierenFilterSkill', skill);
      this.filterValues.skill = sessionStorage.getItem('selektierenFilterSkill');
      this.datasource.filter = JSON.stringify(this.filterValues);
    });

    this.vermittlerFilter.valueChanges.subscribe(vermittler => {
          sessionStorage.setItem('selektierenFilterVermittler', vermittler);
          if (sessionStorage.getItem('selektierenFilterVermittler') === 'undefined')
          {
            sessionStorage.setItem('selektierenFilterVermittler', '');
            this.filterValues.vermittler = sessionStorage.getItem('selektierenFilterVermittler');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
          else
          {
            this.filterValues.vermittler = sessionStorage.getItem('selektierenFilterVermittler');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
        });

    this.bereichFilter.valueChanges.subscribe(bereich => {
          sessionStorage.setItem('selektierenFilterBereich', bereich);
          if (sessionStorage.getItem('selektierenFilterBereich') === 'undefined')
          {
            sessionStorage.setItem('selektierenFilterBereich', '');
            this.filterValues.bereich = sessionStorage.getItem('selektierenFilterBereich');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
          else
          {
            this.filterValues.bereich = sessionStorage.getItem('selektierenFilterBereich');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
        });

    this.statusFilter.valueChanges.subscribe(status => {
          sessionStorage.setItem('selektierenFilterStatus', status);
          if (sessionStorage.getItem('selektierenFilterStatus') === 'undefined')
          {
            sessionStorage.setItem('selektierenFilterStatus', '');
            this.filterValues.status = sessionStorage.getItem('selektierenFilterStatus');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
          else
          {
            this.filterValues.status = sessionStorage.getItem('selektierenFilterStatus');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
        });
  }


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.skill.toLowerCase().indexOf(searchTerms.skill.toLowerCase()) !== -1
      && data.vermittler.toLowerCase().indexOf(searchTerms.vermittler.toLowerCase()) !== -1
      && data.bereich.toLowerCase().indexOf(searchTerms.bereich.toLowerCase()) !== -1
      && data.status.toLowerCase().indexOf(searchTerms.status.toLowerCase()) !== -1;
    };
    return filterFunction;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onClick() {
    this.format.length = 0;

    this.selectUsers.forEach(element => {
      this.format.push(element);
    });

    this.dataTable = this.format.toString();

    this.selectService.getSelectUserID(this.dataTable).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;

      this.datasource.filterPredicate = this.createFilter();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
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
      head: [['Bereich', 'Skill', 'Status', 'User', 'Startzeitraum', 'Endzeitraum', 'Zeitaufwand', 'Vermittler']],
      body: data
    });
    doc.save('Selektieren.pdf');
  }

  onStatusChange(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '22%';
    dialogConfig.data = {skillstatus_id: element.skillstatus_id, status_id: element.status_id,
                         status: element.status, skill: element.skill, nachname: element.nachname,
                         skill_id: element.skill_id, vermittler_id: element.vermittler_id,
                         user_id: element.user_id};
    this.dialog.open(SelektierenStatusChangeComponent, dialogConfig);
  }


  refreshSkillList() {
    this.format.length = 0;

    this.selectUsers.forEach(element => {
      this.format.push(element);
    });

    this.dataTable = this.format.toString();

    this.selectService.getSelectUserID(this.dataTable).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      // this.applyFilter();

      this.datasource.filterPredicate = this.createFilter();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });
  }
}
