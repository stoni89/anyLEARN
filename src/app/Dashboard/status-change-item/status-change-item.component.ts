import { StatusService } from './../../Shared/Services/status.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-change-item',
  templateUrl: './status-change-item.component.html',
  styleUrls: ['./status-change-item.component.css']
})
export class StatusChangeItemComponent implements OnInit {

  status: any;
  selectStatus;

  constructor(public dialogRef: MatDialogRef<StatusChangeItemComponent>, @Inject(MAT_DIALOG_DATA) public data, 
              public statusService: StatusService) { }

  ngOnInit() {
    this.statusService.getAllStatus().subscribe(data => {
      this.status = data;
    });

    this.selectStatus = this.data.status_id;
  }

}
