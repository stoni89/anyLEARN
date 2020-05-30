import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/Shared/Services/post.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  bemerkung: string;
  constructor(public dialogRef: MatDialogRef<PostListItemComponent>, @Inject(MAT_DIALOG_DATA) public data,
              public postService: PostService, private snackbar: MatSnackBar, public skillstatusService: SkillstatusService) { }

  ngOnInit() {
  }


  onClose() {
    this.dialogRef.close();
    this.postService.filter('Register click');
  }

  onAccept(data) {

    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const skill = data.skill;
    const Item: Array<{post_id: number}> = [{post_id: data.post_id}];
    const statusItem: Array<{status_id: number, skillstatus_id: number}> = [
      {
        status_id: 4,
        skillstatus_id: data.skillstatus_id
      }
    ];
    const newItem: Array<{date: string, text: string, user_id: number, fromuser_id: number, skill_id: number, kategorie: string, bemerkung: string, skillstatus_id: number}> = [
      {
        date: date,
        text: 'Abschluss für den Skill "' + skill + '" wurde genehmigt',
        user_id: data.fromuser_id,
        fromuser_id: data.user_id,
        skill_id: data.skill_id,
        kategorie: 'Information',
        bemerkung: data.bemerkung,
        skillstatus_id: data.skillstatus_id
      }
    ];

    this.postService.newPost(newItem[0]).subscribe();
    this.postService.removePost(Item[0].post_id).subscribe();
    this.skillstatusService.updateSkillStatus(statusItem[0]).subscribe();
    this.openGreenSnackBar('Gesendet!', 'Schliessen');
    this.postService.updateBadge();
    this.onClose();
  }

  onDecline(data) {
    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const skill = data.skill;
    const Item: Array<{post_id: number}> = [{post_id: data.post_id}];
    const statusItem: Array<{status_id: number, skillstatus_id: number}> = [
      {
        status_id: 2,
        skillstatus_id: data.skillstatus_id
      }
    ];
    const newItem: Array<{date: string, text: string, user_id: number, fromuser_id: number, skill_id: number, kategorie: string, bemerkung: string, skillstatus_id: number}> = [
      {
        date: date,
        text: 'Abschluss für den Skill "' + skill + '" wurde abgelehnt',
        user_id: data.fromuser_id,
        fromuser_id: data.user_id,
        skill_id: data.skill_id,
        kategorie: 'Information',
        bemerkung: data.bemerkung,
        skillstatus_id: data.skillstatus_id
      }
    ];

    this.postService.newPost(newItem[0]).subscribe();
    this.postService.removePost(Item[0].post_id).subscribe();
    this.skillstatusService.updateSkillStatus(statusItem[0]).subscribe();
    this.openGreenSnackBar('Gesendet!', 'Schliessen');
    this.postService.updateBadge();
    this.onClose();
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
