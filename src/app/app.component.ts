import { AfterViewInit, Component, ViewChild } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'ProjectX';

  constructor() { }
  logout() {
    localStorage.removeItem("token");
   }
  ngOnInit() {

  }
}
