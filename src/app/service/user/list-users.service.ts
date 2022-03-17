import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(private http: HttpClient) {}
    //get all user's
    service_list_users() {
      let promise = new Promise((resolve, reject) => {
        let apiURL = `${environment.backend.api_url}/api/v1/users`;
        var header = {
          headers: new HttpHeaders()
            .set('Authorization',  `Bearer ${localStorage.getItem("token")}`)
        }
        this.http.get(apiURL,header)
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
     //get user by id
     service_list_user_by_id(id:any) {
      let promise = new Promise((resolve, reject) => {
        let apiURL = `${environment.backend.api_url}/api/v1/users`;
        var header = {
          headers: new HttpHeaders()
            .set('Authorization',  `Bearer ${localStorage.getItem("token")}`)
        }
        this.http.post(apiURL,id,header)
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
