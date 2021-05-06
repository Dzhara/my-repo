import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {addReview, loadReviews, loadReviewsSuccess} from './root.actions';
import {ReviewService} from '../../services/review-service/review.service';
import {Injectable} from '@angular/core';
import {GuestbookReview} from '../../services/review-service/review.model';
import {of} from 'rxjs';

@Injectable()
export class RootEffects {
  constructor(
    private actions$: Actions,
    private reviewService: ReviewService
  ) {
  }

  @Effect()
  loadReviews$ = this.actions$.pipe(
    ofType(loadReviews),
    switchMap(() =>
      this.reviewService.getReviews().pipe(
        map((reviews: GuestbookReview[]) => loadReviewsSuccess({reviews})),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
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
