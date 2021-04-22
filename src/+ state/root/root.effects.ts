import {Actions, Effect, ofType} from '@ngrx/effects';
import {AppState} from './root.model';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {addReview, addReviewSuccess, loadReviews, loadReviewsSuccess} from './root.actions';
import {ReviewService} from '../../services/review-service/review.service';
import {Injectable} from '@angular/core';
import {GuestbookReview} from '../../services/review-service/review.model';
import {EMPTY, of} from 'rxjs';

@Injectable()
export class RootEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private reviewService: ReviewService
  ) {
  }

  @Effect()
  loadReviews$ = this.actions$.pipe(
    ofType(loadReviews),
    switchMap((action) =>
      this.reviewService.getReviews().pipe(
        map((reviews: GuestbookReview[]) => loadReviewsSuccess({reviews})),
        catchError(error => of(null))
      )
    )
  );

  @Effect({dispatch: false})
  addReview = this.actions$
    .pipe(
      ofType(addReview),
      tap(({review}) => {
        this.reviewService.addReview(review);
      })
    );
}
