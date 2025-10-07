import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { IAPIResponse } from '../models/interfaces/apiResponse';
import { IAdmin } from '../models/interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IAPIResponse<{admin: IAdmin, token: string}>> {
    return this.http.post<IAPIResponse<{admin:  IAdmin; token: string}>>(`${this.apiUrl}/login`, {"email": email, "password": password})
      .pipe(
        tap(res=> {
          if(res.success && res.data){
            localStorage.setItem('admin', JSON.stringify(res.data.admin));
            localStorage.setItem('token', res.data.token)
          }
        })
      )
  }

  logout(){
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
  }

  get admin(): IAdmin | null {
    const storedAdmin = localStorage.getItem('admin');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get role(): string | null {
    return this.admin?.role || null;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
