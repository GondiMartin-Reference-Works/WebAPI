import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorComponent } from './components/author/author.component';

const routes: Routes = [
  { path:'', component: BookComponent },
  { path:'author', component: AuthorComponent },
  { path:'author/:name', component: AuthorDetailsComponent },
  { path:'book/:title', component: BookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
