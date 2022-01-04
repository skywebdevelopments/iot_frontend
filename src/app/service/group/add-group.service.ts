import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class AddGroupService {

  constructor(private http: HttpClient) { }

  // add group function.
  service_add_group(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/group/create`;
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
