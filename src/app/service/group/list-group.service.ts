import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ListGroupService {

  constructor(private http: HttpClient) { }

  // get group list.
  service_list_group() {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/group`;
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
