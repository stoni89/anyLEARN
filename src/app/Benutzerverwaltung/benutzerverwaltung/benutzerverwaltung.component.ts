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
    const tempUserID = parseInt(localStorage.getItem('userid'));
    this.postService.getPostIDCount(tempUserID).subscribe(data => {
      localStorage.setItem('anzahl', data[0].anzahl);
    })
  }

}
