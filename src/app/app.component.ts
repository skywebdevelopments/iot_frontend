import { Component } from '@angular/core';
import { AuthorizeRoleService } from '../app/service/user/authorize-role.service'

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

  constructor(private service_authorize: AuthorizeRoleService) { }

  ngOnInit() {

  }
  logout() {
    localStorage.removeItem("token");
  }

  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }


}
