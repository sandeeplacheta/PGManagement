import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private secretKey = 'YourSecretKey'; // Change this to a secure key

  encrypt(value: string): string {
    return encodeURIComponent(
      CryptoJS.AES.encrypt(value, this.secretKey).toString()
    );
  }

  decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(
      decodeURIComponent(textToDecrypt),
      this.secretKey
    )
      .toString(CryptoJS.enc.Utf8);
  }
}
