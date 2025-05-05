import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService  {

  constructor(private apiSvc: ApiService) {
    // super(apiSvc, "/api/companyDetails/Party")
  }

  postData(data: any): Observable<any> {
    return this.apiSvc.post('/api/masters/entity', data);
  }
  getEntityListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/masters/entity`)
  }
  getDataByID(id:number): Observable<any> {
    return this.apiSvc.get(`/api/masters/entity/${id}`)
  }

  updateEntity(id:number,data:any): Observable<any> {
    return this.apiSvc.put(`/api/masters/entity/${id}`,data);
  }

}