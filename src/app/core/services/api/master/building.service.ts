import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService  {

  constructor(private apiSvc: ApiService) {
    // super(apiSvc, "/api/masters/location/all")
  }

  postData(data: any): Observable<any> {
    return this.apiSvc.post('/api/masters/building', data);
  }
  getEntityListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/masters/building/all`)
  }
  getDataByID(id:number): Observable<any> {
    return this.apiSvc.get(`/api/masters/building/${id}`)
  }

  updateEntity(id:number,data:any): Observable<any> {
    return this.apiSvc.put(`/api/masters/building/${id}`,data);
  }

}