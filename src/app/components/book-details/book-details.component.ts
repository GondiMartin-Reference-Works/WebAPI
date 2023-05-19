import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | null | undefined;

  constructor(){}

  /**
   * On component initialization loads book back from session storage
   */
  ngOnInit(): void {
    this.book = this.loadBook();
  }

  /**
   * Loads book back from session storage
   * @returns the book
   */
  loadBook(): Book | null{
    const item: string | null = sessionStorage.getItem('selectedBook');
    return (item) ? JSON.parse(item) : null;
  }
  
}
