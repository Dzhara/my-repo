import {createAction, props} from '@ngrx/store';
import {ADD_REVIEW, ADD_REVIEW_SUCCESS, APP_LOADING, LOAD_REVIEWS, LOAD_REVIEWS_SUCCESS} from './root.actiontypes';
import {GuestbookReview} from '../../services/review-service/review.model';

export const setLoading = createAction(APP_LOADING, props<{ loading }>());
export const addReview = createAction(ADD_REVIEW, props<{review: GuestbookReview}>());
export const addReviewSuccess = createAction(ADD_REVIEW_SUCCESS);
export const loadReviews = createAction(LOAD_REVIEWS);
export const loadReviewsSuccess = createAction(
  LOAD_REVIEWS_SUCCESS,
  props<{ reviews: GuestbookReview[] }>(),
);
