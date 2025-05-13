import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationService  {

  constructor(private apiSvc: ApiService) {
  }

   postDataDesignation(data: any): Observable<any> {
    return this.apiSvc.post('/api/masters/designation', data);
  }

  getListViewDataForDesignation(): Observable<any> {
    return this.apiSvc.get(`/api/masters/designation/all`)
  }

  getDesignationDataByID(id:number): Observable<any> {
    return this.apiSvc.get(`/api/masters/designation/${id}`)
  }

  updateDesignationData(id:number,data:any): Observable<any> {
    return this.apiSvc.put(`/api/masters/designation/${id}`,data);
  }

}