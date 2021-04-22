import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Blogpost} from '../../services/blogpost-service/blogspot.model';
import {BlogpostService} from '../../services/blogpost-service/blogpost.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../+ state/root/root.model';
import {setLoading} from '../../+ state';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.scss']
})


export class BlogpostListComponent implements OnInit, OnDestroy {
  posts: Blogpost[];
  private readonly onDestroy$ = new Subject<void>();

  constructor(private blogpostService: BlogpostService, private store: Store<AppState>) {
    this.store.dispatch(setLoading({loading: true}));
  }

  ngOnInit(): void {
    this.blogpostService.getBlogposts().pipe(takeUntil(this.onDestroy$)).subscribe((items) => {
      this.posts = items;
      this.store.dispatch(setLoading({loading: false}));
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
