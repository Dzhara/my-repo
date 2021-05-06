import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {MockSelector, MockStore, MockStoreConfig, provideMockStore} from '@ngrx/store/testing';
import {AppState} from '../+ state/root/root.model';
import {selectLoading, selectReviews} from '../+ state';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

const initialState: AppState = {
  loading: false,
  reviews: []
};
const selectors: MockSelector[] = [
  {
    selector: selectLoading,
    value: true,
  },
  {
    selector: selectReviews,
    value: [],
  },
];

const storeConfig: MockStoreConfig<AppState> = {
  initialState,
  selectors
};

describe('AppComponent', () => {
  let store: MockStore<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore(storeConfig),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render two tabs', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const tabs = compiled.querySelectorAll('a');
    expect(tabs.length).toEqual(2);
  });

  it('tabs text should be GUESTBOOK and BLOGPOST', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const tabs = compiled.querySelectorAll('a');
    expect(tabs[0].textContent).toContain('BLOGPOSTS');
    expect(tabs[1].textContent).toContain('GUESTBOOK');
  });
});
