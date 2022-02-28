import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class AddGroupService {

  constructor(private http: HttpClient) { }

  // add group function.
  service_add_group(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/s_group/create`;
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
        ).catch((err)=> {
          reject(err);
      });
    });
    return promise;

  };

}
