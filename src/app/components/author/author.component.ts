import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  
  authors: Author[] | null = [];
  searchTerm: string = "";
  hasFoundAny: boolean = false;

  constructor(public authorService: AuthorService) {}
  
  ngOnInit(): void {
    this.loadAuthors();
    this.hasFoundAny = (this.authors?.length == 0) ? false : true;
  }

  /**
   * Gets authors from book service which calls the API
   */
  getAuthors(){
    this.authorService.getAuthorsBySearchTerm(this.searchTerm)
      .subscribe((data: { docs: any[] }) => {
        let i: number = 0;
        this.authors = data.docs.map((authorData) =>{
          console.log(authorData);
          return {
            id: i++,
            key: authorData.key,
            name: authorData.name,
            birthDate: authorData.birth_date,
            topWork: authorData.top_work,
            workCount: authorData.work_count,
          }
        });
        this.hasFoundAny = (this.authors.length == 0) ? false : true;
        this.saveAuthors();
      });
  }

  /**
   * Saves all the searched authors into session storage
   */
  saveAuthors(){
    sessionStorage.setItem('authors', JSON.stringify(this.authors));
    timer(200);
  }

  /**
   * Saves selected author into session storage - we use the selectedAuthor for Bookmark
   */
  saveAuthor(author: Author){
    sessionStorage.setItem('selectedAuthor', JSON.stringify(author));
    timer(200);
  }

  /**
   * Loads all the searched authors from session storage
   */
  loadAuthors(){
    const storedAuthors = sessionStorage.getItem('authors');
    if (storedAuthors)
      this.authors = JSON.parse(storedAuthors);
  }

  /**
   * Saves one author's key into session storage - store it for API call
   * @param authorKeys - the author accessible via this key
   */
  saveAuthorKey(authorKey: string){
    sessionStorage.setItem('authorKey', JSON.stringify(authorKey));
    timer(200);
  }

  /**
   * Used for author-details where the html page should know who called itself
   */
  authorSwitch(){
    sessionStorage.setItem('switch', JSON.stringify('authorCalled'));
    timer(200);
  }
}
