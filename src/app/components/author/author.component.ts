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

  saveAuthors(){
    sessionStorage.setItem('authors', JSON.stringify(this.authors));
    timer(200);
  }

  loadAuthors(){
    const storedAuthors = sessionStorage.getItem('authors');
    if (storedAuthors)
      this.authors = JSON.parse(storedAuthors);
  }

  saveAuthorKey(authorKey: string){
    sessionStorage.setItem('authorKey', JSON.stringify(authorKey));
    timer(200);
  }

  saveAuthor(_author: Author){
    sessionStorage.setItem('selectedAuthor', JSON.stringify(_author));
    timer(200);
  }

  authorSwitch(){
    sessionStorage.setItem('switch', JSON.stringify('authorCalled'));
    timer(200);
  }
}
