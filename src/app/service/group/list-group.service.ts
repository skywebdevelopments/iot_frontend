import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ListGroupService {

  constructor(private http: HttpClient) { }

  // get group list.
  service_list_group() {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/s_group`;
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
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
}
