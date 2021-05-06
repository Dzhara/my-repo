import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogpostService} from '../../services/blogpost-service/blogpost.service';
import {ActivatedRoute} from '@angular/router';
import {Blogpost, Comment} from '../../services/blogpost-service/blogspot.model';
import {forkJoin, Subject} from 'rxjs';
import {AppState} from '../../+ state/root/root.model';
import {Store} from '@ngrx/store';
import {setLoading} from '../../+ state';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit, OnDestroy {
  post: Blogpost;
  comments: Comment[];
  private readonly onDestroy$ = new Subject<void>();

  constructor(private blogpostService: BlogpostService, private route: ActivatedRoute, private store: Store<AppState>) {
    this.store.dispatch(setLoading({loading: true}));
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const postId = Number(routeParams.get('id'));
    forkJoin([this.blogpostService.getPost(postId), this.blogpostService.getComments(postId)])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.post = result[0];
        this.comments = result[1];
        this.store.dispatch(setLoading({loading: false}));
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
