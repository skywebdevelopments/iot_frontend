import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UpdateUgroupService {
  constructor(private http: HttpClient) { }
  service_update_ugroup(formData: any) {
   let promise = new Promise((resolve, reject) => {
     let apiURL = `${environment.backend.api_url}/api/v1/users/update/ugroup`;
     var header = {
       headers: new HttpHeaders()
         .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
     }
     this.http.put(apiURL, formData, header)
       .toPromise()
       .then(
         res => {
           resolve(res);
         }
       ).catch((err)=> {
         reject(err);
     });
   });
   return promise;

 };
}