import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class ListSensorService {

  constructor(private http: HttpClient) { }
  //get all sensors
  service_list_sensor() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/sensor`;
      this.http.get(apiURL)
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