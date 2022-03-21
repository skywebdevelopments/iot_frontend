import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class SensorProvisioService {

  constructor(private http: HttpClient) { }

  service_list_sensors_status(){
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/provision/status`;
      // var header = {
      //   headers: new HttpHeaders()
      //     .set('Authorization',  `Bearer ${localStorage.getItem("token")}`)
      // }
      this.http.get(apiURL)
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
  }
}
