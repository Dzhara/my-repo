import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {GuestbookComponent} from './guestbook.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MockSelector, MockStoreConfig, provideMockStore} from '@ngrx/store/testing';
import {AppState} from '../../+ state/root/root.model';
import {selectLoading, selectReviews} from '../../+ state';
import {AppComponent} from '../../app/app.component';

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

describe('GuestbookComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        GuestbookComponent
      ],
      providers: [MatDialog, provideMockStore(storeConfig),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create guestbook', () => {
    const fixture = TestBed.createComponent(GuestbookComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should have header with text REVIEWS', () => {
    const fixture = TestBed.createComponent(GuestbookComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const header = compiled.querySelector('h2');
    expect(header).toBeTruthy();
    expect(header.textContent).toContain('REVIEWS');
  });
  it('should have button with text ADD REVIEW', () => {
    const fixture = TestBed.createComponent(GuestbookComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.guestbook-add-review-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('ADD REVIEW');
  });
  it('should call openDialog when ADD REVIEW button clicked', () => {
    const fixture = TestBed.createComponent(GuestbookComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const component = fixture.componentInstance;
    spyOn(component, 'openDialog');
    const button = compiled.querySelector('.guestbook-add-review-button');
    button.click();
    expect(component.openDialog).toHaveBeenCalled();
  });
});
