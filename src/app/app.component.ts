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
  logout() {
    localStorage.removeItem("token");
    this.cookieService.deleteAll();
  }

  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }

  isloggedin() {
    if (localStorage.getItem('token')) {
      this.showLogin = false;

      return true
    }
    else{
      
      this.showLogin = true;
      return false
    }

  }

}
