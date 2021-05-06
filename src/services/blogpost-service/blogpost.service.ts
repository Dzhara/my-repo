import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blogpost, Comment} from './blogspot.model';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
};


@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  constructor(private http: HttpClient) {
  }

  getBlogposts(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>('https://jsonplaceholder.typicode.com/posts', config
    );
  }

  getPost(id: number): Observable<Blogpost> {
    return this.http.get<Blogpost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  }
}
