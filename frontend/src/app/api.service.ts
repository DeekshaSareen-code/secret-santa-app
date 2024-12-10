// frontend/src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Backend API URL

  constructor(private http: HttpClient) {}

  getHello(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { responseType: 'text' }).pipe(
      // Handle errors here
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => 'Something went wrong!');
      })
    );
  }
}
