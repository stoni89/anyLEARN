import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.updateBadge();
    this.postService.filter('Register Click');
  }

}
