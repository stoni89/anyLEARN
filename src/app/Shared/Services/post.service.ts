import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private listners = new Subject<any>();
  badgeCount: Observable<number>;

  constructor(private httpClient: HttpClient) {
   }



  getPostID(id: number) {
    return this.httpClient.get(`http://localhost:3000/post/` + id);
  }

  getPostIDCount(id: number) {
    return this.httpClient.get(`http://localhost:3000/post/count/` + id);
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
