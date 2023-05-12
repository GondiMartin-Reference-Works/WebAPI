import { Component, OnInit } from '@angular/core';
import { BookService }  from '../../services/book.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  searchTerm: string = "";
  hasFoundAny: boolean = false;

  constructor(public bookService : BookService) {}

   ngOnInit(): void {
    this.books = [];
  }

  getBooks(){
    this.bookService.getBooksByTitle(this.searchTerm)
      .subscribe((data: { docs: any[] }) => {
        this.books = data.docs.map((bookData) => {
          return {
            coverId: bookData.cover_i,
            editionCount: bookData.edition_count,
            title: bookData.title,
            authorName: bookData.author_name,
            firstPublishYear: bookData.first_publish_year
          };
        });
        this.hasFoundAny = (this.books.length == 0) ? false : true;
    });
  }
  
  

}
