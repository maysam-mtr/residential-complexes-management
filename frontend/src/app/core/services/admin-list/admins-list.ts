import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdmin } from '../../models/interfaces/admin';
import { IAPIResponse } from '../../models/interfaces/apiResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { IComplex } from '../../models/interfaces/complex';
import { IBuilding } from '../../models/interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class AdminsListService {
  private apiUrl = environment.apiUrl
  
  constructor(private http: HttpClient) {}

  getAllAdmins(
    page?: number, 
    limit?: number, 
    search?: string
  ): Observable<IAPIResponse<{admins: IAdmin [], limit: number, page: number, total: number}>> {
    let params = new HttpParams();

    if (page != null) params = params.set('page', page.toString());
    if (limit != null) params = params.set('limit', limit.toString());
    if (search) params = params.set('search', search);

    return this.http.get<IAPIResponse<{admins:  IAdmin[], limit: number, page: number, total: number}>>(`${this.apiUrl}/admins`, {params});
  }

  getAdminComplexes(id: number): Observable<IAPIResponse<{complexes: IComplex[]}>>{
    return this.http.get<IAPIResponse<{complexes:  IComplex[]}>>(`${this.apiUrl}/admins/${id}/complexes`);
  }

  getAdminBuildings(id: number): Observable<IAPIResponse<{buildings: IBuilding[]}>>{
    return this.http.get<IAPIResponse<{buildings:  IBuilding[]}>>(`${this.apiUrl}/admins/${id}/buildings`);
  }

  addAdmin(admin: {first_name: string, last_name: string, civility: string, phone: string, password: string, role: number, email:string}){
    return this.http.post<IAPIResponse<{admin:  IAdmin[]}>>(`${this.apiUrl}/admins`, admin);
  }
}
