import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService  {

  constructor(private apiSvc: ApiService) {
  }

   postData(data: any): Observable<any> {
    return this.apiSvc.post('/api/masters/role', data);
  }

  getListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/masters/role/all`)
  }
}