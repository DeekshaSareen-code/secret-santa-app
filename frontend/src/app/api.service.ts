import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Your backend API URL

  constructor(private http: HttpClient) {}

  addName(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-name`, { name });
  }

  getNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get-names`);
  }

  createSecretSantaPairs(names: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-pairs`, { names });
  }
}
