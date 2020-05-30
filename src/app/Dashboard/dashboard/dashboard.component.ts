import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.updateBadge();
    this.postService.filter('Register Click');
  }

}
