import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class GenerateTokenService {

  constructor(private http: HttpClient) { }

  // generate token function.
  service_generate_token(formData: any) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/token`;
      this.http.post(apiURL, formData)
        .toPromise()
        .then(
          res => { // Success
            if (res['code'] !== 404 && res['code'] !== 1105) {
              localStorage.setItem('token', res["token"]); //to store token in local storage 
            }
            resolve(res);
          }
        ).catch((err) => {
          reject(err);
        })
    });
    return promise;

  };

}
