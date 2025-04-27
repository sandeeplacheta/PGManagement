import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService  {

  constructor(private apiSvc: ApiService) {
    // super(apiSvc, "/api/companyDetails/Party")
  }

  postData(data: any): Observable<any> {
    return this.apiSvc.post('/api/companyDetails/party', data);
  }
  getListViewData(): Observable<any> {
    return this.apiSvc.get(`/api/masters/company`)
  }

  getTallyDataByParty(): Observable<any> {
    return this.apiSvc.get(`/api/companyDetails/PartyDetailsForTally`)
  }

  getPartyRepresentative(): Observable<any> {
    return this.apiSvc.get(`/api/companyDetails/PartyRepresentative?PartyId=${localStorage.getItem('employer')}`)
  }

  GSTAuthentication(gstno: string): Observable<any> {
    return this.apiSvc.get(`/api/gst/gstVerify?gstin=${gstno}`)
  }
  getDataByemployerID(employer: number): Observable<any> {
    return this.apiSvc.get(`/api/companyDetails/PartiesCounters/${employer}`)//${localStorage.getItem('employer')}
  }
  getDataByemployerID2(employer: number): Observable<any> {
    return this.apiSvc.get(`/api/companyDetails/GetPartiesCounters/${employer}`)//${localStorage.getItem('employer')}
  }
  searchParties(employerId: number, searchTerm: string): Observable<any> {
    return this.apiSvc.get(`/api/search/PartiesSearch/${employerId}?searchTerm=${searchTerm}`);
  }
  getDropDownDataByZone(zoneId: number, DropDownFor: string): Observable<any> {
    return this.apiSvc.get(`/api/companyDetails/MultipleRolesDropdown?zoneId=${zoneId}&designationType=${DropDownFor}`)
  }
  getSalesExecutiveByPsr(psrId: number): Observable<any> {
    return this.apiSvc.get(`/api/companyDetails/PsrSalesExecutive?psrId=${psrId}`)
  }
  // patchEinvCredentials(username: string, password: string): Observable<any> {
  //   return this.apiSvc.patchparams(`api/sales-orders/EinvoiceUserPassword?PartyId=${Number(localStorage.getItem('employer'))}&UserName=${username}&Password=${password}`)
  // }
  patchEinvCredentials(username: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('PartyId', Number(localStorage.getItem('employer')))
      .set('UserName', username)
      .set('Password', password);

    return this.apiSvc.patch(`/api/sales-orders/EinvoiceUserPassword`, params);
  }


  getSsCnfSuperDist(): Observable<any> {
    const userId = Number(localStorage.getItem('userId'))
    const partyId = Number(localStorage.getItem('employer'))
    return this.apiSvc.get(`/api/report-controller/partyWiseTargetDropdown?userId=${userId}&PartyId=${partyId}`)
  }
  // getDistBySsCnfSuperDist(ids: number[]): Observable<any> {
  //   let params = new HttpParams();
  //   ids.forEach((id) => {
  //     params = params.append('PartyIds', id.toString());
  //   });

  //   return this.apiSvc.getparams(`/api/report-controller/partyWiseTargetDistributorDropdown`, params);
  // }

  // getSubDistByDist(ids: number[]): Observable<any> {
  //   let params = new HttpParams();
  //   ids.forEach((id) => {
  //     params = params.append('PartyIds', id.toString());
  //   });

  //   return this.apiSvc.getparams(`/api/report-controller/partyWiseTargetSubDistributorDropdown`, params)

  // }

  getSupplierDropDownData(): Observable<any> {
    return this.apiSvc.get(`/api/purchase/GetSupplierNameForDropDown`)
  }

}