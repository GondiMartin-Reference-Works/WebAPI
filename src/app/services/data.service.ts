import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_KEY = 'e40d07f00b094602953cc3bf8537477e';

  constructor(private httpClient: HttpClient) { }

  getNews(){
    return this.httpClient.get<any>(`https://newsapi.org/v2/everything?q=DevOps&sortBy=popularity&apiKey=${this.API_KEY}`);
  }

  getBooksByTitle(searchTerm: string){
    return this.httpClient.get<any>(`https://openlibrary.org/search.json?title=${searchTerm}`)
  }
}
