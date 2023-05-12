import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  author: string = "";
  constructor(private authorService: AuthorService, private route: ActivatedRoute) { }

  ngOnInit() {
  }
}
