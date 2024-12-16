import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/secret-santa'; // Your backend API URL

  constructor(private http: HttpClient) {}

  addName(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-name`, { name });
  }

  getNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get-names`);
  }

  createSecretSantaPairs(names: string[]): Observable<any> {
    console.log('Creating pairs for:', names);
    return this.http.post(`${this.apiUrl}/create-pairs`, { names });
  }

  getReceiver(
    groupId: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName);

    return this.http.get<any>(`${this.apiUrl}/get-receiver/${groupId}`, {
      params,
    });
  }
}
