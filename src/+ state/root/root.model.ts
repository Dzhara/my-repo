import {GuestbookReview} from '../../services/review-service/review.model';

export interface AppState {
  loading: boolean;
  reviews: GuestbookReview[];
}
