import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class DeleteSensorService {

  constructor(private http: HttpClient) { }

  // delete group function.
  service_delete_sensor(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/node/delete`;
      var headers = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
      }
      
      this.http.post(apiURL, formData,headers)
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
