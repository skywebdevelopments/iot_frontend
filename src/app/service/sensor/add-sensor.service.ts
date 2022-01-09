import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AddSensorService {

  constructor(private http: HttpClient) { }
  service_add_sensor(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/sensor/create`;
      this.http.post(apiURL, formData)
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


