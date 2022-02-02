import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeRoleService {

  constructor() { }
  service_authorize_user(view_role): boolean {

    if (localStorage.getItem('token') === null) {
      return false;
    }

    let user = jwt_decode(localStorage.getItem('token'));
    let user_role = user['roles'];

    for (var i = 0; i < view_role.length; i++) {
      let flag = false;
      for (var j = 0; j < user_role.length; j++) {
        if (view_role[i] === user_role[j]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
  }
}
