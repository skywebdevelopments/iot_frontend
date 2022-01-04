import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class DeleteGroupService {

  constructor(private http: HttpClient) { }

  // delete group function.
  service_delete_group(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/group/delete`;
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
