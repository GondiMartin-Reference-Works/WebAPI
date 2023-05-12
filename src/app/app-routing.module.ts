import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

const routes: Routes = [
  { path:'', component: BookComponent },
  { path:'author/:name', component: AuthorComponent},
  { path:'book/:title', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
