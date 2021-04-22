import {Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogCreateReviewComponent} from '../dialog-create-review/dialog-create-review.component';
import {AppState} from '../../+ state/root/root.model';
import {Store} from '@ngrx/store';
import {addReview, loadReviews, selectReviews} from '../../+ state';
import {Observable, Subject} from 'rxjs';
import {GuestbookReview} from '../../services/review-service/review.model';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.scss']
})
export class GuestbookComponent {

  reviews: Observable<GuestbookReview[]>;
  private onDestroy$ = new Subject<void>();
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.reviews = this.store.select(selectReviews);
    this.store.dispatch(loadReviews());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateReviewComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.author && result.message) {
        this.store.dispatch(addReview({review: result}));
      }
    });
  }
}
