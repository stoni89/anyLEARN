import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';

@Component({
  selector: 'app-benutzerverwaltung',
  templateUrl: './benutzerverwaltung.component.html',
  styleUrls: ['./benutzerverwaltung.component.css']
})

export class BenutzerverwaltungComponent implements OnInit {

  constructor(private postService: PostService) {

   }

  ngOnInit() {
    this.postService.updateBadge();
    this.postService.filter('Register Click');
  }

}
