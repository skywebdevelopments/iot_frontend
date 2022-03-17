import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private http: HttpClient) { }
   service_update_user_active(formData: any) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/updateactive`;
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
  service_update_user_role(formData: any) {
    formData["groupname"] = formData.u_group['groupname']; 
    let promise = new Promise((resolve, reject) => {
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

  service_update_user(formData: any) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/update`;
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
