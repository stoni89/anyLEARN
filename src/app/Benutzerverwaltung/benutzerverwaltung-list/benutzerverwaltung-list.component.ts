import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../Shared/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BenutzerverwaltungNewUserComponent } from '../benutzerverwaltung-new-user/benutzerverwaltung-new-user.component';
import { User } from 'src/app/Shared/Interfaces/user';


@Component({
  selector: 'app-benutzerverwaltung-list',
  templateUrl: './benutzerverwaltung-list.component.html',
  styleUrls: ['./benutzerverwaltung-list.component.css']
})
export class BenutzerverwaltungListComponent implements OnInit {

  currentData: any;
  datasource;
  displayedColumns = ['istAktiv', 'kuerzel' , 'vorname', 'nachname', 'name', 'mail', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor (private service: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe(data => {
      console.log(data);
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  cellClicked(row) {
    console.log(row);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    console.log(row);
    this.dialog.open(BenutzerverwaltungNewUserComponent,dialogConfig);
  }
}
