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

    // Hash password
    var hash = CryptoJS.HmacSHA256(formData['password'], environment.backend.hash_secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    formData['password'] = hashInBase64

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/users/GenerateToken`;
      this.http.post(apiURL, formData)
        .toPromise()
        .then(
          res => { // Success
            if (res['code'] !== 404) {
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
