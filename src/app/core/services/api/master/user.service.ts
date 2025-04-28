import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(private apiSvc: ApiService) {
    // super(apiSvc, "/api/companyDetails/Party")
  }

  postData(data: any): Observable<any> {
    return this.apiSvc.post('/api/companyDetails/party', data);
  }
  getListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/masters/employee`)
  }

} 