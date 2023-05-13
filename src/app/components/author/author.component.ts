import { Component } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  authorKeys: string[] | null = [];
  authors: Author[] | null | undefined;
  book: Book | null = null;

  constructor(private authorService: AuthorService, private bookService: BookService) {
    this.authors = [];
  }

  ngOnInit() {
    this.authorKeys = this.authorService.loadAuthorKeys();

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

    this.book = this.bookService.loadBook();

    console.log(this.authors);
  }

  writeBio(author: Author): string{
    const bio = (typeof(author.bio) === 'object') ? author.bio['value'] : author.bio;
    return bio;
  }
}
