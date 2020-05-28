import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { UserService } from 'src/app/Shared/Services/user.service';


@Component({
  selector: 'app-dashboard-skill-list',
  templateUrl: './dashboard-skill-list.component.html',
  styleUrls: ['./dashboard-skill-list.component.css']
})
export class DashboardSkillListComponent implements OnInit {
  datasource;
  users: any;
  selectUser;
  displayedColumns = ['status_id', 'bereich', 'skill' , 'zeitpunkt', 'zeitaufwand', 'vermittler', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private skillstatusService: SkillstatusService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.skillstatusService.listen().subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.refreshSkillList();
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('key'))
    {
      console.log('1');
      localStorage.setItem('key', '1');
      // tslint:disable-next-line: radix
      this.selectUser = parseInt(localStorage.getItem('key'));
    }
    else
    {
      console.log('2');
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

}
