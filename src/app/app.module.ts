import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/library-app/library-app.component';

import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
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
