import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../api/api-url";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${BASE_API_URL}/auth`;

  constructor(
    private http: HttpClient
  ) {
  }

  public logIn(username: string, password: string): Observable<any> {
    console.log(username, password)
    return this.http.post(`${this.apiUrl}`, {username, password});
  }
}
