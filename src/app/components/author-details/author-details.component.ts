import { Component } from '@angular/core';
import { AuthorDetails } from 'src/app/models/author-details.model';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent {
  authorKeys: string[] | null = [];
  authorKey: string | null = "";
  authors: AuthorDetails[] | null | undefined;
  book: Book | null = null;
  switchBookAuthor: boolean | null = true; // if book called: true, if author called: false, otherwse: null
  author: Author | null = null;

  constructor(private authorService: AuthorService) {
    this.authors = [];
  }

  ngOnInit() {
    this.switchBookAuthor = this.getSwitchValue();
    if(this.switchBookAuthor){
      // Book called where there might be multiple authors
      this.authorKeys = this.loadAuthorKeys();
      this.getMultipleAuthorKeys();
    }
    else{
      // Author called where there's only one author
      this.authorKey = this.loadAuthorKey(); 
      this.getOneAuthor();
    } 
    this.book = this.loadBook();
  }

  /**
   * If Author Page called then we only need to fetch one author.
   */
  getOneAuthor(){
    this.authorService.getAuthorByKey(this.authorKey)
        .subscribe((data: any) => {
          this.authors?.push({
            name: data.name,
            fullerName: data.fuller_name,
            birthDate: data.birth_date,
            bio: data.bio,
            wikipedia: data.wikipedia,
          });
          this.author = this.loadAuthor();
      });
  }

  /**
   * If Book Page called then we need to fetch multiple authors.
   */
  getMultipleAuthorKeys(){
    this.authorKeys?.forEach((authorKey) => {
      console.log(authorKey);
      this.authorService.getAuthorByKey(authorKey)
        .subscribe((data: any) => {
          this.authors?.push({
            name: data.name,
            fullerName: data.fuller_name,
            birthDate: data.birth_date,
            bio: data.bio,
            wikipedia: data.wikipedia,
          });
        });
    });
  }

  /**
   * Write bio based on the fact that author can have it stored in an object and not stored too.
   * @param author - the author with bio
   * @returns the author's bio
   */
  writeBio(author: AuthorDetails): string{
    const bio = (typeof(author.bio) === 'object') ? author.bio['value'] : author.bio;
    return bio;
  }

  /**
   * Loads one selected book back from session storage.
   * @returns the selected book
   */
  loadBook(): Book | null{
    const item: string | null = sessionStorage.getItem('selectedBook');
    return (item) ? JSON.parse(item) : null;
  }

  /**
   * Loads one selected author back from session storage. - using it for bookmark
   * @returns the selected book
   */
  loadAuthor(): Author | null{
    const item: string | null = sessionStorage.getItem('selectedAuthor');
    return (item) ? JSON.parse(item) : null;
  }

  /**
   * Loads author keys back from session storage
   * @returns author keys.
   */
  loadAuthorKeys(): string[] | null{
    const item: string | null = sessionStorage.getItem('authorKeys');
    return (item) ? JSON.parse(item) : null;
  }

  /**
  * Loads one author key back from session storage - API call.
  * @returns author key.
  */
  loadAuthorKey(): string | null{
    const item: string | null = sessionStorage.getItem('authorKey');
    return (item) ? JSON.parse(item) : null;
  }

  /**
   * Decides who called the page. If the book.component.html then it's true, if the author...html then it's false, otherwise it's null
   * @returns 
   */
  getSwitchValue(): boolean | null{
    const item: string | null = sessionStorage.getItem('switch')
    const whoCalled: string | null = (item) ? JSON.parse(item) : null;
    if( whoCalled ){
      return (whoCalled === 'bookCalled') ? true : false;
    }
    return null;
  }
}
