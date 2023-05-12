import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

interface bioObject{
  type: string,
  value: string,
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  authorKeys: string[] | null = [];
  authors: Author[] | null | undefined;

  constructor(private authorService: AuthorService, private route: ActivatedRoute) {
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

    console.log(this.authors);
  }

  writeBio(author: Author): string{
    const bio = (typeof(author.bio) === 'object') ? author.bio['value'] : author.bio;
    return bio;
  }
}
