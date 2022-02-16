import { Component, OnInit } from '@angular/core';
import { AuthorizeRoleService } from '../service/user/authorize-role.service'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private service_authorize: AuthorizeRoleService, public cookieService: CookieService) { }

  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }

  isloggedin() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      return false
    }
    else {
      return true
    }

  }

  logout() {
    localStorage.removeItem("token");
    this.cookieService.deleteAll();
  }


  ngOnInit(): void {
  }

}
