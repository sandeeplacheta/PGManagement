import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService  {

  constructor(private apiSvc: ApiService) {
    // super(apiSvc, "/api/masters/location/all")
  }

   postDataRoom(data: any): Observable<any> {
    return this.apiSvc.post('/api/masters/room', data);
  }
  postDataRoomType(data: any): Observable<any> {
    return this.apiSvc.post('/api/room-type/save', data);
  }
  getRoomTypeListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/master/room-type/all`)
  }
  getRoomListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/masters/room/all`)
  }
  getRoomTypeDataByID(id:number): Observable<any> {
    return this.apiSvc.get(`/api/master/room-type/${id}`)
  }
  geRoomtDataByID(id:number): Observable<any> {
    return this.apiSvc.get(`/api/masters/room/${id}`)
  }
  getRoomTypeDataByBuildingId(id:number): Observable<any> {
    return this.apiSvc.get(`/api/master/room-type/by-building/${id}`)
  }
  updateRoomType(id:number,data:any): Observable<any> {
    return this.apiSvc.put(`/api/master/room-type/update/${id}`,data);
  }
  updateRoomData(id:number,data:any): Observable<any> {
    return this.apiSvc.put(`/api/masters/room/${id}`,data);
  }

}