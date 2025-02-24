import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../api/api-url";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${BASE_API_URL}/employee`;

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  public create(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, employee);
  }

  public remove(employee: Employee): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${employee._id}`);
  }

  public update(employee: Employee): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${employee._id}`, employee);
  }
}
