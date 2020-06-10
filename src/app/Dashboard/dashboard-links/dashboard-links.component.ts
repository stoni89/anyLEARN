import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { LinksService } from 'src/app/Shared/Services/links.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard-links',
  templateUrl: './dashboard-links.component.html',
  styleUrls: ['./dashboard-links.component.css']
})
export class DashboardLinksComponent implements OnInit {

  datasource;
  displayedColumns = ['bezeichnung', 'url' , 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private snackbar: MatSnackBar, public dialogRef: MatDialogRef<DashboardLinksComponent>,
              public linksService: LinksService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.linksService.getSpezificLink(this.data.skill_id).subscribe(data2 => {
      this.datasource = new MatTableDataSource(data2 as any);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onOpen(row) {
    window.open(row.url, "_blank");
  }

}
