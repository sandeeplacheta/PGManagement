import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService  {

  constructor(private apiSvc: ApiService) {
    // super(apiSvc, "/api/companyDetails/Party")
  }

  LoginAPI(data: any): Observable<any> {
    return this.apiSvc.post('/auth/login', data);
  }

  logoutAPI(data:any):Observable<any>{
    return this.apiSvc.post('/auth/logout',data);
  }

}