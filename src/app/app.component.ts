import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {selectLoading} from '../+ state';
import {Store} from '@ngrx/store';
import {AppState} from '../+ state/root/root.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean>;
  routerLinks = [{ href: '/blogposts', label: 'BLOGPOSTS' }, { href: '/guestbook', label: 'GUESTBOOK' }];

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(selectLoading);
  }
}
