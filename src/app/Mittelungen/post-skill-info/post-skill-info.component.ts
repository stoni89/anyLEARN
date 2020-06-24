import { ZeitpunktService } from './../../Shared/Services/zeitpunkt.service';
import { UserService } from './../../Shared/Services/user.service';
import { BereichService } from './../../Shared/Services/bereich.service';
import { PostService } from 'src/app/Shared/Services/post.service';
import { SkillService } from './../../Shared/Services/skill.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-skill-info',
  templateUrl: './post-skill-info.component.html',
  styleUrls: ['./post-skill-info.component.css']
})
export class PostSkillInfoComponent implements OnInit {

  bereich: any;
  vermittler: any;
  zeitpunkt: any;

  constructor(public dialogRef: MatDialogRef<PostSkillInfoComponent>, public skillService: SkillService,
              public postService: PostService, public bereichService: BereichService,
              public userService: UserService, public zeitpunktService: ZeitpunktService) { }

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
  }

  onClose() {
    this.postService.initializeFormGroup();
    this.dialogRef.close();
  }

}
