import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
   
  // generate token function.
  service_signup(formData: any) {
    
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/create`;
      this.http.post(apiURL,formData)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        ).catch((err)=> {
          reject(err);
      })
    });
    return promise;

  };
}
