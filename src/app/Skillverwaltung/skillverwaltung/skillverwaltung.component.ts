import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';

@Component({
  selector: 'app-skillverwaltung',
  templateUrl: './skillverwaltung.component.html',
  styleUrls: ['./skillverwaltung.component.css']
})
export class SkillverwaltungComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.updateBadge();
    this.postService.filter('Register Click');
  }

}
