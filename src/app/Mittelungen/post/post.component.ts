import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.updateBadge();
    this.postService.filter('Register Click');
  }

}
