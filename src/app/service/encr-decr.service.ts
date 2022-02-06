import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() { }

  //The set method is use for encrypt the value.
  set(value, key) {

    var encrypted = CryptoJS.AES.encrypt(value, key);

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(value, key) {

    var decrypted = CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);

    return decrypted;
  }

}
