import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BASE_API_URL} from "../../api/api-url";
import {HttpClient} from "@angular/common/http";

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
}
