import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';

const routes: Routes = [
  { path:'', component: BookComponent },
  { path:'author/:name', component: AuthorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
