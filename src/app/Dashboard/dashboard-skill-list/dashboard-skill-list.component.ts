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
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Component({
  selector: 'app-dashboard-skill-list',
  templateUrl: './dashboard-skill-list.component.html',
  styleUrls: ['./dashboard-skill-list.component.css']
})
export class DashboardSkillListComponent implements OnInit {
  datasource;
  users: any;
  userID = localStorage.getItem('userid');
  selectUser;
  displayedColumns = ['status_id', 'bereich', 'skill' , 'zeitpunkt', 'zeitaufwand', 'vermittler', 'actions'];

  userRole: string = localStorage.getItem('role');
  userName: string = localStorage.getItem('name');

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public skillstatusService: SkillstatusService,
              private adalService: MsAdalAngular6Service,
              public userService: UserService,
              private dashboardService: DashboardService,
              private dialog: MatDialog) {
    this.skillstatusService.listen().subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.refreshSkillList();
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('key'))
    {
      localStorage.setItem('key', this.userID);
      // tslint:disable-next-line: radix
      this.selectUser = parseInt(localStorage.getItem('key'));
    }
    else
    {
      // tslint:disable-next-line: radix
      this.selectUser = parseInt(localStorage.getItem('key'));
    }

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.skillstatusService.getSkillTableUser(this.selectUser).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });

    console.log(this.selectUser);
  }


  refreshSkillList() {
    this.skillstatusService.getSkillTableUser(this.selectUser).subscribe(data => {
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

  onSelectUserChange() {
    localStorage.setItem('key', this.selectUser);
    // tslint:disable-next-line: radix
    this.selectUser = parseInt(localStorage.getItem('key'));
    // tslint:disable-next-line: deprecation
    this.skillstatusService.getSkillTableUser(this.selectUser).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  onEdit(row) {
    this.dashboardService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(DashboardListItemComponent, dialogConfig);
  }

  onStatusChange(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '36%';
    dialogConfig.data = {skillstatus_id: element.skillstatus_id, status_id: element.status_id,
                         status: element.status, skill: element.skill, nachname: element.nachname};
    this.dialog.open(StatusChangeItemComponent, dialogConfig);
  }
}
