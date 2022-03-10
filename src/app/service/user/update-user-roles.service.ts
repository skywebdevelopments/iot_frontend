import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UpdateUserRolesService {

  constructor(private http: HttpClient) { }
   // update user permissions function.
   service_update_user_roles(formData: any) {
    let promise = new Promise((resolve, reject) => {
      //let apiURL = `${environment.backend.api_url}/api/v1/users/create`;
      let apiURL = `${environment.backend.api_url}/api/v1/users/updaterole`;
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
      }
      this.http.put(apiURL, formData, header)
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          }
        ).catch((err)=> {
          reject(err);
      });
    });
    return promise;

  };
}
