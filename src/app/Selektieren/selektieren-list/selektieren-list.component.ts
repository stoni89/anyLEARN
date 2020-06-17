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
  displayedColumns = ['nachname', 'status', 'bereich', 'skill', 'zeitpunkt', 'zeitaufwand', 'vermittler'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public userService: UserService, public selectService: SelektierenService,
              public skillstatusService: SkillstatusService, private dialog: MatDialog) {
    this.skillstatusService.listen().subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.refreshSkillList();
    });
  }

  ngOnInit() {
    this.userService.getAllUsersAzubi().subscribe(data => {
      this.users = data;
    });

    this.datasource = new MatTableDataSource();
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
      head: [['Skill', 'Status', 'User', 'Vermittler']],
      body: data
    });
    doc.save('Selektieren.pdf');
  }

  onStatusChange(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '36%';
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
      this.applyFilter();
    });
  }
}
