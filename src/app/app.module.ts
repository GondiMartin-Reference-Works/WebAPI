import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/library-app/library-app.component';

import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './components/book/book.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorComponent } from './components/author/author.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AuthorDetailsComponent,
    BookDetailsComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
