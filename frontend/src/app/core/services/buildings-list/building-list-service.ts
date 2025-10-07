import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../models/interfaces/apiResponse';
import { IBuilding } from '../../models/interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingListService {
  private apiUrl = environment.apiUrl
  
  constructor(private http: HttpClient) {}

  getAllBuildings(): Observable<IAPIResponse<{buildings: IBuilding[]}>> {
    return this.http.get<IAPIResponse<{buildings:  IBuilding[]}>>(`${this.apiUrl}/buildings`);
  }

  addBuilding(building: {name: string, complex_id: number, admin_id: number}){
    return this.http.post<IAPIResponse<{building:  IBuilding[]}>>(`${this.apiUrl}/buildings`, building);
  }

  deleteBuilding(id: number){
    return this.http.delete<IAPIResponse<null>>(`${this.apiUrl}/buildings/${id}`);
  }
}
