import { Component, OnInit } from '@angular/core';
import { BookService }  from '../../services/book.service';
import { Book } from 'src/app/models/book.model';
import { timer } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[] | null = [];
  searchTerm: string = "";
  hasFoundAny: boolean = false;

  constructor(public bookService : BookService) {}

  /**
   * On comp. init. loads books back.
   * If no book was found set hasFoundAny ("No results") true.
   */
   ngOnInit(): void {
    this.loadBooks();
    this.hasFoundAny = (this.books?.length == 0) ? false : true;
    console.log(this.books);
  }

  /**
   * Gets books back from book service which calls the API
   */
  getBooks(){
    this.bookService.getBooksByTitle(this.searchTerm)
      .subscribe((data: { docs: any[] }) => {
        let i: number = 0;
        this.books = data.docs.map((bookData) => {
          console.log(bookData);
          return {
            id: i++,
            coverId: bookData.cover_i,
            editionCount: bookData.edition_count,
            title: bookData.title,
            authorNames: bookData.author_name,
            firstPublishYear: bookData.first_publish_year,
            publisher: (bookData.publisher != undefined) ? bookData.publisher[0] : "No one",
            authorKeys: bookData.author_key,
          };
        });
        this.hasFoundAny = (this.books.length == 0) ? false : true;
        this.saveBooks();
    });
    
  }

  /**
   * Saves one book into session storage
   * @param _book - the book which needs to be saved
   */
  saveBook(_book: Book){
    sessionStorage.setItem('selectedBook', JSON.stringify(_book));
    timer(200);
  }

  /**
   * Saves all the searched books into session storage
   * @returns 
   */
  saveBooks(){
    sessionStorage.setItem('books', JSON.stringify(this.books));
    timer(200);
  }

  /**
   * Loads all the searched book from session storage
   */
  loadBooks(){
    const storedBooks = sessionStorage.getItem('books');
    if (storedBooks)
      this.books = JSON.parse(storedBooks);
  }

  /**
   * Saves one author into session storage
   * @param authorKeys - the author accessible via this key
   */
  saveAuthorKeys(authorKeys: string){
    sessionStorage.setItem('authorKeys', JSON.stringify(authorKeys));
    timer(200);
  }
}
