import { ZeitpunktService } from './../../Shared/Services/zeitpunkt.service';
import { UserService } from './../../Shared/Services/user.service';
import { BereichService } from './../../Shared/Services/bereich.service';
import { PostService } from 'src/app/Shared/Services/post.service';
import { SkillService } from './../../Shared/Services/skill.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DashboardCloseDialogComponent } from 'src/app/Dashboard/dashboard-close-dialog/dashboard-close-dialog.component';
import { SkillstatusService } from 'src/app/Shared/Services/skillstatus.service';
import { LogsService } from 'src/app/Shared/Services/logs.service';
import { UeberschrittenService } from 'src/app/Shared/Services/ueberschritten.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-skill-info',
  templateUrl: './post-skill-info.component.html',
  styleUrls: ['./post-skill-info.component.css']
})
export class PostSkillInfoComponent implements OnInit {

  bereich: any;
  vermittler: any;
  zeitpunkt: any;
  endzeitpunkt: any;
  userRole: string = localStorage.getItem('role');

  constructor(public dialogRef: MatDialogRef<PostSkillInfoComponent>, public skillService: SkillService,
              public postService: PostService, public bereichService: BereichService,
              public userService: UserService, public zeitpunktService: ZeitpunktService,
              private dialog: MatDialog, public skillstatusService: SkillstatusService,
              public logService: LogsService, public ueberschrittenService: UeberschrittenService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.bereichService.getAllBereich().subscribe(data => {
      this.bereich = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.vermittler = data;
    });

    this.zeitpunktService.getAllZeitpunkt().subscribe(data => {
      this.zeitpunkt = data;
    });

    this.zeitpunktService.getAllEndZeitpunkt().subscribe(data => {
      this.endzeitpunkt = data;
    });
  }

  onClose() {
    this.postService.initializeFormGroup();
    this.dialogRef.close();
  }

  onExit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '18%';
    this.dialog.open(DashboardCloseDialogComponent, dialogConfig);
  }

  onSave() {
    this.skillService.updateSkill(this.postService.form.value).subscribe(data => {
      this.openGreenSnackBar('Erfolgreich angepasst!', 'Schließen');
    }, error => {
      this.openRedSnackBar('Fehler beim anpassen!', 'Schließen');
    });

    const verItem: Array<{vermittler_id: number, skill_id: number}> = [{vermittler_id: this.postService.form.value.vermittler_id,
                                                                        skill_id: this.postService.form.value.skill_id}];
    this.skillstatusService.updateVermittlerSkillStatus(verItem[0]).subscribe();

    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    const logitem: Array<{ eintrag: string, date: string, user_id: number, art: string, cat_id: number}> = [
      {
        eintrag: 'Der Skill "' + this.postService.form.value.skill + '" wurde angepasst',
        // tslint:disable-next-line: object-literal-shorthand
        date: date,
        // tslint:disable-next-line: radix
        user_id: parseInt(localStorage.getItem('userid')),
        art: 'Skill',
        cat_id: 5
      }
    ];

    this.ueberschrittenService.updateStart().subscribe( data => {
      this.ueberschrittenService.updateEnd().subscribe( data => {
        this.ueberschrittenService.updateStartFalse().subscribe( data => {
          this.ueberschrittenService.updateEndFalse().subscribe();
        });
      });
    });

    this.logService.newLogs(logitem[0]).subscribe();
    this.onClose();
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
