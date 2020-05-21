import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../Shared/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore} from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-benutzerverwaltung-list',
  templateUrl: './benutzerverwaltung-list.component.html',
  styleUrls: ['./benutzerverwaltung-list.component.css']
})
export class BenutzerverwaltungListComponent implements OnInit {

  datasource: MatTableDataSource<any>;
  displayedColumns = ['istAktiv', 'kuerzel' , 'vorname', 'nachname', 'name', 'mail', 'zugehoerigkeit', 'rolle', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private fs: AngularFirestore, private service: UserService) {
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

}
