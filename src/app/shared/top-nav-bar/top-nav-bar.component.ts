import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  constructor(public cookieService: CookieService) { }
  logout() {
    localStorage.removeItem("token");
    this.cookieService.deleteAll();
  }

  ngOnInit(): void {
  }

}
