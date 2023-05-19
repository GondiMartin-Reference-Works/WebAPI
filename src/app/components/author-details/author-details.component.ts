import { Component } from '@angular/core';
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
  authors: Author[] | null | undefined;
  book: Book | null = null;

  constructor(private authorService: AuthorService) {
    this.authors = [];
  }

  ngOnInit() {
    this.authorKeys = this.loadAuthorKeys();

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

    this.book = this.loadBook();

    console.log(this.authors);
  }

  /**
   * Write bio based on the fact that author can have it stored in an object and not stored too.
   * @param author - the author with bio
   * @returns the author's bio
   */
  writeBio(author: Author): string{
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
   * Loads author keys back from session storage
   * @returns author keys.
   */
  loadAuthorKeys(): string[] | null{
    const item: string | null = sessionStorage.getItem('authorKeys');
    return (item) ? JSON.parse(item) : null;
  }
}
