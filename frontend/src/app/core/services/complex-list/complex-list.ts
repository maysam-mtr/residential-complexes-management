import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../models/interfaces/apiResponse';
import { IComplex } from '../../models/interfaces/complex';
import { IBuilding } from '../../models/interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class ComplexListService {
  private apiUrl = environment.apiUrl
  
  constructor(private http: HttpClient) {}

  getAllComplexes(): Observable<IAPIResponse<{complexes: IComplex[]}>> {
    return this.http.get<IAPIResponse<{complexes:  IComplex[]}>>(`${this.apiUrl}/complexes`);
  }

  getComplexBuildings(id: number): Observable<IAPIResponse<{buildings: IBuilding[]}>> {
    return this.http.get<IAPIResponse<{buildings:  IBuilding[]}>>(`${this.apiUrl}/complexes/${id}/buildings`);
  }

  addComplex(complex: {identity: string, address: string, campaign_info: string, admin_id: number}){
    return this.http.post<IAPIResponse<{complex:  IComplex[]}>>(`${this.apiUrl}/complexes`, complex);
  }
}
