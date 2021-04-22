import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogpostComponent} from '../components/blogpost/blogpost.component';
import {BlogpostListComponent} from '../components/blogpost-list/blogpost-list.component';
import {GuestbookComponent} from '../components/guestbook/guestbook.component';


const routes: Routes = [
  {
    path: 'blogposts',
    component: BlogpostListComponent,
  },
  {
    path: 'post/:id',
    component: BlogpostComponent
  },
  {
    path: 'guestbook',
    component: GuestbookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
