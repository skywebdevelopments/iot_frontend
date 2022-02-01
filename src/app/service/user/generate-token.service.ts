import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class GenerateTokenService {

  constructor(private http: HttpClient) { }
 
  // generate token function.
  service_generate_token(formData: any) {
    
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/users/GenerateToken`;
      this.http.post(apiURL,formData)
        .toPromise()
        .then(
          res => { // Success
            localStorage.setItem('token',res["token"]); //to store token in local storage 
            resolve(res);
          }
        ).catch((err)=> {
          reject(err);
      })
    });
    return promise;

  };

}
