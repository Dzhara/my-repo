import {AppState} from './root.model';
import {clone} from 'ramda';
import * as actions from './root.actions';
import {Action, createReducer, on} from '@ngrx/store';

export const initialState: AppState = {
  // set initial required properties
  loading: false,
  reviews: []
};

const appReducer = createReducer(initialState,
  on(actions.setLoading, (state, {loading}) => {
    return {
      ...state,
      loading,
    };
  }),

  on(actions.addReview, (state, {review}) => {
    const cloned = clone(state.reviews);
    cloned.push(review);
    return {
      ...state,
      reviews: cloned,
    };
  }),

  on(actions.loadReviews, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(actions.loadReviewsSuccess, (state, {reviews}) => {
    return {
      ...state,
      loading: false,
      reviews,
    };
  }),
);

export function reducer(state: AppState, action: Action) {
  return appReducer(state, action);
}
