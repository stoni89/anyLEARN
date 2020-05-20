import { User } from './../../Shared/Interfaces/user';
import { UserService } from './../../Shared/Services/user.service';
import {Observable} from 'rxjs';
<<<<<<< HEAD
<<<<<<< HEAD
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
=======
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore} from '@angular/fire/firestore';
>>>>>>> 54c55a3... UserTable
=======
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 33fddf559615a4351ea64db348650dcd43425692

@Component({
  selector: 'app-benutzerverwaltung',
  templateUrl: './benutzerverwaltung.component.html',
  styleUrls: ['./benutzerverwaltung.component.css']
})
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 33fddf559615a4351ea64db348650dcd43425692
export class BenutzerverwaltungComponent implements OnInit {
  users: User[];
  displayedColumns = ['mail', 'nachname', 'name', 'vorname'];

  constructor(private usersService: UserService) {
  }

  ngOnInit() {
    this.usersService.getAllusers().subscribe(data => {

      this.users = data.map(e => {
        return {
          name: e.payload.doc.data()['name'],
          nachname: e.payload.doc.data()['nachname'],
          vorname: e.payload.doc.data()['vorname'],
          mail: e.payload.doc.data()['mail'],
        };
      });
    });
<<<<<<< HEAD
=======
export class BenutzerverwaltungComponent implements OnInit, AfterViewInit {
  users: Observable<any[]>;
  datasource: MatTableDataSource<any>;
  displayedColumns = ['mail', 'nachname', 'name', 'vorname'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public fs: AngularFirestore, public service: UserService) {
  }

  ngOnInit() {
    this.service.getAllusers().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.sort = this.sort;
    })
  };

  ngAfterViewInit(): void {

>>>>>>> 54c55a3... UserTable
=======
>>>>>>> 33fddf559615a4351ea64db348650dcd43425692
  }
}
