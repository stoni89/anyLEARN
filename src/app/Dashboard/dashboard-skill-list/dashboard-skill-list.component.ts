import { SkillService } from './../../Shared/Services/skill.service';
import { BereichService } from './../../Shared/Services/bereich.service';
import { StatusService } from './../../Shared/Services/status.service';
import { StatusChangeItemComponent } from './../status-change-item/status-change-item.component';
import { DashboardService } from './../../Shared/Services/dashboard.service';
import { DashboardListItemComponent } from './../dashboard-list-item/dashboard-list-item.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import { DashboardLinksComponent } from '../dashboard-links/dashboard-links.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard-skill-list',
  templateUrl: './dashboard-skill-list.component.html',
  styleUrls: ['./dashboard-skill-list.component.css']
})
export class DashboardSkillListComponent implements OnInit {
  datasource;
  users: any;
  vermittler: any;
  userID = localStorage.getItem('userid');
  selectUser;
  gesamt;
  offen;
  bearbeitung;
  erledigt;
  displayedColumns = ['status', 'bereich', 'skill' , 'zeitpunkt', 'endzeitpunkt', 'zeitaufwand', 'vermittler', 'actions'];

  skillFilter = new FormControl(sessionStorage.getItem('dashboardFilterSkill'));
  vermittlerFilter = new FormControl(sessionStorage.getItem('dashboardFilterVermittler'));
  bereichFilter = new FormControl(sessionStorage.getItem('dashboardFilterBereich'));
  statusFilter = new FormControl(sessionStorage.getItem('dashboardFilterStatus'));
  filterValues = {
    skill: sessionStorage.getItem('dashboardFilterSkill'),
    vermittler: sessionStorage.getItem('dashboardFilterVermittler'),
    bereich: sessionStorage.getItem('dashboardFilterBereich'),
    status: sessionStorage.getItem('dashboardFilterStatus')
  };
  bereich: any;
  status: any;

  userRole: string = localStorage.getItem('role');
  userName: string = localStorage.getItem('name');

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public skillstatusService: SkillstatusService,
              public userService: UserService,
              public skillService: SkillService,
              public bereichService: BereichService,
              public statusService: StatusService,
              private dashboardService: DashboardService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) {
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

    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.userService.getAllUsersAzubi().subscribe(data => {
      this.users = data;

      if(localStorage.getItem('role') === 'User')
      {
        this.selectUser = parseInt(localStorage.getItem('userid'));
      }
      else
      {
        // tslint:disable-next-line: radix
        if (isNaN (parseInt(localStorage.getItem('key'))))
        {
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem('key', data[0]['user_id']);
          // tslint:disable-next-line: radix
          this.selectUser = parseInt(localStorage.getItem('key'));
        }
        else
        {
          // tslint:disable-next-line: radix
          this.selectUser = parseInt(localStorage.getItem('key'));
        }
      }


      this.skillstatusService.getSkillTableUser(this.selectUser).subscribe(data2 => {
        this.datasource = new MatTableDataSource(data2 as any);
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;

        this.datasource.filterPredicate = this.createFilter();
        this.datasource.filter = JSON.stringify(this.filterValues);

        this.skillFilter.valueChanges.subscribe(skill => {
          sessionStorage.setItem('dashboardFilterSkill', skill);
          this.filterValues.skill = sessionStorage.getItem('dashboardFilterSkill');
          this.datasource.filter = JSON.stringify(this.filterValues);
        });

        this.vermittlerFilter.valueChanges.subscribe(vermittler => {
          sessionStorage.setItem('dashboardFilterVermittler', vermittler);
          if (sessionStorage.getItem('dashboardFilterVermittler') === 'undefined')
          {
            sessionStorage.setItem('dashboardFilterVermittler', '');
            this.filterValues.vermittler = sessionStorage.getItem('dashboardFilterVermittler');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
          else
          {
            this.filterValues.vermittler = sessionStorage.getItem('dashboardFilterVermittler');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
        });

        this.bereichFilter.valueChanges.subscribe(bereich => {
          sessionStorage.setItem('dashboardFilterBereich', bereich);
          if (sessionStorage.getItem('dashboardFilterBereich') === 'undefined')
          {
            sessionStorage.setItem('dashboardFilterBereich', '');
            this.filterValues.bereich = sessionStorage.getItem('dashboardFilterBereich');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
          else
          {
            this.filterValues.bereich = sessionStorage.getItem('dashboardFilterBereich');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
        });

        this.statusFilter.valueChanges.subscribe(status => {
          sessionStorage.setItem('dashboardFilterStatus', status);
          if (sessionStorage.getItem('dashboardFilterStatus') === 'undefined')
          {
            sessionStorage.setItem('dashboardFilterStatus', '');
            this.filterValues.status = sessionStorage.getItem('dashboardFilterStatus');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
          else
          {
            this.filterValues.status = sessionStorage.getItem('dashboardFilterStatus');
            this.datasource.filter = JSON.stringify(this.filterValues);
          }
        });

      });
    });

    this.userService.getAllUsers().subscribe(data => {
      this.vermittler = data;
    });

    this.statusService.getAllStatus().subscribe(data => {
      this.status = data;
    });

    this.skillstatusService.getSkillStatusCountOffen(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.offen = data3[0]['offen'];
    });

    this.skillstatusService.getSkillStatusCountBearbeitung(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.bearbeitung = data3[0]['bearbeitung'];
    });

    this.skillstatusService.getSkillStatusCountErledigt(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.erledigt = data3[0]['erledigt'];
    });

    this.skillstatusService.getSkillStatusCountGesamt(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.gesamt = data3[0]['gesamt'];
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

  print() {
    const user: string = localStorage.getItem('name');
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
      head: [['Status', 'Bereich', 'Skill' , 'Startzeitraum', 'Endzeitraum', 'Zeitaufwand', 'Vermittler']],
      body: data
    });
    doc.save(user + '_Skills.pdf');
  }

  refreshSkillList() {
    this.skillstatusService.getSkillTableUser(this.selectUser).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      // this.applyFilter();
      this.datasource.filterPredicate = this.createFilter();
      this.datasource.filter = JSON.stringify(this.filterValues);
    });

    this.skillstatusService.getSkillStatusCountOffen(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.offen = data3[0]['offen'];
    });

    this.skillstatusService.getSkillStatusCountBearbeitung(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.bearbeitung = data3[0]['bearbeitung'];
    });

    this.skillstatusService.getSkillStatusCountErledigt(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.erledigt = data3[0]['erledigt'];
    });

    this.skillstatusService.getSkillStatusCountGesamt(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
      this.gesamt = data3[0]['gesamt'];
    });
  }


  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onSelectUserChange() {
    localStorage.setItem('key', this.selectUser);
    // tslint:disable-next-line: radix
    this.selectUser = parseInt(localStorage.getItem('key'));
    // tslint:disable-next-line: deprecation
    this.skillstatusService.getSkillTableUser(this.selectUser).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      // this.applyFilter();
      this.datasource.filterPredicate = this.createFilter();
      this.datasource.filter = JSON.stringify(this.filterValues);

      this.skillstatusService.getSkillStatusCountOffen(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
        this.offen = data3[0]['offen'];
      });

      this.skillstatusService.getSkillStatusCountBearbeitung(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
        this.bearbeitung = data3[0]['bearbeitung'];
      });

      this.skillstatusService.getSkillStatusCountErledigt(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
        this.erledigt = data3[0]['erledigt'];
      });

      this.skillstatusService.getSkillStatusCountGesamt(parseInt(localStorage.getItem('key'))).subscribe(data3 => {
        this.gesamt = data3[0]['gesamt'];
      });
    });
  }

  onSelectVermittlerChange(element, event) {
    const item: Array<{ skillstatus_id: number, vermittler_id: number}> = [{ skillstatus_id: element.skillstatus_id, vermittler_id: event}];
    this.skillstatusService.updateVermittlerSkillStatusSpecific(item[0]).subscribe();
    this.openGreenSnackBar('Vermittler geändert', 'Schliessen');
    this.skillstatusService.filter('Register click');
  }

  onEdit(row) {
    this.dashboardService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    this.dialog.open(DashboardListItemComponent, dialogConfig);
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
    this.dialog.open(StatusChangeItemComponent, dialogConfig);
  }

  onLink(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '60%';
    dialogConfig.data = {skill: row.skill, skill_id: row.skill_id};
    this.dialog.open(DashboardLinksComponent, dialogConfig);
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }
}
