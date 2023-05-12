import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  getAuthorByKey(authorKey: string | null): any{
    return this.httpClient.get<any>(`https://openlibrary.org/authors/${authorKey}.json`);
  }

  loadAuthorKeys(): string[] | null{
    const item: string | null = localStorage.getItem('authorKeys');
    return (item) ? JSON.parse(item) : null;
  }
}
