import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Gives author back with API call
   * @param authorKey - the key we get from book data and used to search actor
   * @returns an author in json
   */
  getAuthorByKey(authorKey: string | null): any{
    return this.httpClient.get<any>(`https://openlibrary.org/authors/${authorKey}.json`);
  }
  /**
   * Gives authors back with API call
   * @param searchTerm - the search term that the user gives in order to search author
   * @returns authors that match the search term
   */
  getAuthorsBySearchTerm(searchTerm: string | null): any{
    return this.httpClient.get<any>(`https://openlibrary.org/search/authors.json?q=${searchTerm}`);
  }
}
