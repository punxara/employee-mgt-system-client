import {Injectable} from '@angular/core';
import {BASE_API_URL} from "../../api/api-url";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private apiUrl = `${BASE_API_URL}/activity-log`;

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
}
