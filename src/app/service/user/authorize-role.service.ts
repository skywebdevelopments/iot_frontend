import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { EncrDecrService } from '../encr-decr.service'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AuthorizeRoleService {

  constructor(private service_enc_dec: EncrDecrService) { }
  service_authorize_user(view_role): boolean {

    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || !localStorage.getItem('token') ) {
      return false;
    }

    let token = this.service_enc_dec.get(localStorage.getItem('token'), environment.backend.t_secret);
    let user = jwt_decode(token);

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
