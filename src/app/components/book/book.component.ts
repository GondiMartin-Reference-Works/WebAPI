import { Component, OnInit } from '@angular/core';
import { BookService }  from '../../services/book.service';
import { Book } from 'src/app/models/book.model';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  searchTerm: string = "";
  hasFoundAny: boolean = false;

  constructor(public bookService : BookService, private router: Router) {}

   ngOnInit(): void {
    this.books = [];
  }

  getBooks(){
    this.bookService.getBooksByTitle(this.searchTerm)
      .subscribe((data: { docs: any[] }) => {
        this.books = data.docs.map((bookData) => {
          console.log(bookData);
          return {
            coverId: bookData.cover_i,
            editionCount: bookData.edition_count,
            title: bookData.title,
            authorName: bookData.author_name,
            firstPublishYear: bookData.first_publish_year,
            publisher: bookData.publisher[0],
          };
        });
        this.hasFoundAny = (this.books.length == 0) ? false : true;
    });
  }

  saveBook(_book: Book){
    localStorage.setItem('selectedBook', JSON.stringify(_book));
    return timer(200);
  }
}
