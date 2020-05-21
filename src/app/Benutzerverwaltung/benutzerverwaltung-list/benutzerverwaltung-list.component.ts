import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../Shared/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore} from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/Shared/Interfaces/user';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BenutzerverwaltungNewUserComponent } from '../benutzerverwaltung-new-user/benutzerverwaltung-new-user.component';


@Component({
  selector: 'app-benutzerverwaltung-list',
  templateUrl: './benutzerverwaltung-list.component.html',
  styleUrls: ['./benutzerverwaltung-list.component.css']
})
export class BenutzerverwaltungListComponent implements OnInit {

  users: User[];
  currentData: any;
  datasource: MatTableDataSource<any>;
  displayedColumns = ['istAktiv', 'kuerzel' , 'vorname', 'nachname', 'name', 'mail', 'zugehoerigkeit', 'rolle', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private fs: AngularFirestore, private service: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getAllusers().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
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
