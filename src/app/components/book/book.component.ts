import { Component, OnInit } from '@angular/core';
import { DataService }  from '../../services/data.service';
import { Observable, delay, map, timer } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  data: any[] = [];
  searchTerm: string = "";
  hasFoundAny: boolean = false;

  constructor(public dataService : DataService) {}

   ngOnInit(): void {
  }

  getBooks(){
    this.dataService.getBooksByTitle(this.searchTerm)
      .subscribe((books)=>{
        console.log(books);
        this.data = books['docs'];
        this.hasFoundAny = (this.data?.length == 0) ? false : true;
        console.log(this.hasFoundAny);
      });
  }

}
