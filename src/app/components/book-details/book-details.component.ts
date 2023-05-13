import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | null | undefined;

  constructor(){
  }

  ngOnInit(): void {
    this.book = this.loadBook();
  }

  loadBook(): Book | null{
    const item: string | null = localStorage.getItem('selectedBook');
    return (item) ? JSON.parse(item) : null;
  }
  
}
