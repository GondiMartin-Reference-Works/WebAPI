import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getBooksByTitle(searchTerm: string): any{
    return this.httpClient.get<any>(`https://openlibrary.org/search.json?title=${searchTerm}`);
  }
}
