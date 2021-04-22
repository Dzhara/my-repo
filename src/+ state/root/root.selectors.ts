import {createFeatureSelector, createSelector} from '@ngrx/store';
import {APP_STATE} from '../constants';
import {AppState} from './root.model';

const selectAppState = createFeatureSelector<AppState>(APP_STATE);

const getLoading = (state: AppState) => state.loading;
const getReviews = (state: AppState) => state.reviews;

export const selectLoading = createSelector(selectAppState, getLoading);
export const selectReviews = createSelector(selectAppState, getReviews);
