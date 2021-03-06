import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http: HttpClient,public cookieService: CookieService) { }
  service_delete_user(formData: any) {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${environment.backend.api_url}/api/v1/users/delete`;
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
      }
  
      this.http.post(apiURL, formData,header)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
            localStorage.removeItem("token");
            this.cookieService.deleteAll();
          }
        ).catch((err)=> {
          reject(err);
      });
    });
    return promise;

  };
}
