import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from '../../Shared/Services/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  currentData: any;
  datasource;
  displayedColumns = ['text', 'date' , 'kategorie', 'von', 'actions'];
  loggedUserID = parseInt(localStorage.getItem('userid'));

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private postService: PostService, private dialog: MatDialog) {
    this.postService.listen().subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.refreshPostList();
    });
   }

  ngOnInit() {
    this.postService.getPostID(this.loggedUserID).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });

    this.postService.updateBadge();
    this.postService.filter('Register Click');
  }

  refreshPostList() {
    this.postService.getPostID(this.loggedUserID).subscribe(data => {
      this.datasource = new MatTableDataSource(data as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      this.applyFilter();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onClick(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.data = row;
    this.dialog.open(PostListItemComponent, dialogConfig);
  }

}
