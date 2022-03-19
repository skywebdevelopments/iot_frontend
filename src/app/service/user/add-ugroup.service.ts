import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class AddUgroupService {

  constructor(private http: HttpClient) { }

  // add group function.
  service_add_group(formData: any) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/create/usergroup`;
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
      }
      this.http.post(apiURL, formData, header)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        ).catch((err) => {
          reject(err);
        });
    });
    return promise;

  };
  // add group role.
  service_add_role(formData: any) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/create/ugroup/role`;
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
      }
      this.http.post(apiURL, formData, header)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        ).catch((err) => {
          reject(err);
        });
    });
    return promise;

  };
}
