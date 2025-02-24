import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BASE_API_URL} from "../../api/api-url";
import {HttpClient} from "@angular/common/http";
import {Department} from "./department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = `${BASE_API_URL}/department`;

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  public create(department: Department): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, department);
  }

  public remove(department: Department): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${department._id}`);
  }

  public update(department: Department): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${department._id}`, department);
  }
}
