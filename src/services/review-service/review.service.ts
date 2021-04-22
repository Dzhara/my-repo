import {Injectable} from '@angular/core';
import {GuestbookReview} from './review.model';
import {Observable, of} from 'rxjs';

const GUESTBOOK_REVIEWS_STORAGE_KEY = 'guestbook-reviews';

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  getReviews(): Observable<GuestbookReview[]> {
    const items = JSON.parse(localStorage.getItem(GUESTBOOK_REVIEWS_STORAGE_KEY)) || [];
    return of(items);
  }

  addReview(review: GuestbookReview): void {
    const items = JSON.parse(localStorage.getItem(GUESTBOOK_REVIEWS_STORAGE_KEY)) || [];
    items.push(review);
    localStorage.setItem(GUESTBOOK_REVIEWS_STORAGE_KEY, JSON.stringify(items));
  }
}
