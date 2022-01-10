import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UpdateSensorService {

  constructor(private http: HttpClient) { }
  
  // update sensor function.
  service_update_sensor(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/sensor/update`;
      this.http.put(apiURL, formData)
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          }
        );
    });
    return promise;

  };
}
