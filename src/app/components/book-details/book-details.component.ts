import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | null | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService){
  }

  ngOnInit(): void {
    this.book = this.bookService.loadBook();
  }
  
}
