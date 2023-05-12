import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  getAuthorByKey(authorName: string): any{
    return this.httpClient.get<any>(`https://openlibrary.org/search/authors.json?q=${authorName}`);
  }
}
