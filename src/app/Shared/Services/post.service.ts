import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private listners = new Subject<any>();
  badgeCount: Observable<number>;
  url = 'http://srv-automate:3000/';

  constructor(private httpClient: HttpClient) {
   }



  getPostID(id: number) {
    return this.httpClient.get(this.url + `post/` + id);
  }

  getPostIDCount(id: number) {
    return this.httpClient.get(this.url + `post/count/` + id);
  }

  removePost(id: number) {
    return this.httpClient.delete(this.url + `post/` + id);
   }

  newPost(newPost: any) {
    return this.httpClient.post(this.url + `post`, newPost);
  }



  listen(): Observable<any>{
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  updateBadge() {
    const tempUserID = parseInt(localStorage.getItem('userid'));
    this.getPostIDCount(tempUserID).subscribe(data => {
      this.badgeCount = data[0].anzahl;
    });
  }
}
