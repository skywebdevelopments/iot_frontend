import { Component } from '@angular/core';
import { AuthorizeRoleService } from '../app/service/user/authorize-role.service'
import { CookieService } from 'ngx-cookie-service'

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
  showLogin = true;

  constructor(private service_authorize: AuthorizeRoleService, public cookieService: CookieService) { }

  ngOnInit() {
    this.isloggedin();
    
    if (this.cookieService.get('token')) {
      localStorage.setItem('token', this.cookieService.get('token'))
    }

  }
  isloggedin() {
<<<<<<< HEAD
    if (localStorage.getItem('token')) {
      this.showLogin = false;

      return true
    }
    else{
      
      this.showLogin = true;
=======
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      console.log(localStorage.getItem('token'))
>>>>>>> d0dbf1d3c83555d3b78acf362cfdcb5c39a3511b
      return false
    }
    else {
      return true
    }

  }


}
