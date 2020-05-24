import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../Shared/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BenutzerverwaltungUserItemComponent } from '../benutzerverwaltung-user-item/benutzerverwaltung-user-item.component';
import { User } from 'src/app/Shared/Interfaces/user';


@Component({
  selector: 'app-benutzerverwaltung-list',
  templateUrl: './benutzerverwaltung-list.component.html',
  styleUrls: ['./benutzerverwaltung-list.component.css']
})
export class BenutzerverwaltungListComponent implements OnInit {


  currentData: any;
  datasource;
  displayedColumns = ['istAktiv', 'kuerzel' , 'vorname', 'nachname', 'name', 'mail', 'kategorie', 'rolle', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor (private service: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe(data => {
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
    //console.log(row);
  }

  onEdit(row) {
    console.log(row);
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(BenutzerverwaltungUserItemComponent,dialogConfig);
  }

  onNew() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(BenutzerverwaltungUserItemComponent,dialogConfig);
  }
}
