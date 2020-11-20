import {Component, EventEmitter, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  search_keyword:any;
  @Output() sendEvent: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

   sendEventValue() {
        this.sendEvent.emit(this.search_keyword);

    }



  ngOnInit(): void {
  }

}
