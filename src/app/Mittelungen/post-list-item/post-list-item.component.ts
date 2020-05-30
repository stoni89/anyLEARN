import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/Shared/Services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostListItemComponent>, @Inject(MAT_DIALOG_DATA) public data,
              public postService: PostService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }


  onClose() {
    this.dialogRef.close();
    this.postService.filter('Register click');
  }

  onAccept() {

  }

  onDecline() {

  }

  onRead(data) {
    const Item: Array<{post_id: number}> = [{post_id: data.post_id}]
    this.postService.removePost(Item[0].post_id).subscribe();
    this.openGreenSnackBar('Gelesen!', 'Schliessen');
    this.onClose();
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
