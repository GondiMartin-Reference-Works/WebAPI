import { Component, OnInit } from '@angular/core';
import { DataService }  from '../../services/data.service';

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
    this.data = [];
    this.hasFoundAny = false;
  }

  getBooks(){
    this.dataService.getBooksByTitle(this.searchTerm).subscribe((data)=>{
      console.log(data);
      this.data = data['docs'];
    });
    this.hasFoundAny = (this.data?.length == 0) ? false : true;
  }

}
