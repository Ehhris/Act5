import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost/ionApi/';

  processData(endpoint: any, data: any) {
    return this.http.post(this.apiUrl + endpoint, data);
  }
}
