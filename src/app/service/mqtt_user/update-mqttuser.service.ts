import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UpdateMqttuserService {

  constructor(private http: HttpClient) { }

  service_update_mqtt_user(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/mqttuser/update`;
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
        ).catch((err) => {
          reject(err);
        });
    });
    return promise;

  };
}
