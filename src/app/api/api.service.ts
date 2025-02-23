import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
  }

  public get(url: string, param = {}): Observable<any> {
    let httpParam = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        httpParam = httpParam.append(key, param[key]);
      }
    }
    return this.http.get(url, { headers: this.getHeaders(), params: httpParam, withCredentials: true });
  }

  public post(url: string, param: {}, responseType: any = 'json', observe: any = 'body'): Observable<any> {
    return this.http.post(url, param, { headers: this.getHeaders(), responseType: responseType, observe: observe, withCredentials: true });
  }

  public put(url: string, param: {}): Observable<any> {
    return this.http.put<any>(url, param, { headers: this.getHeaders(), withCredentials: true });
  }

  public patch(url: string, param: {}): Observable<any> {
    return this.http.patch<any>(url, param, { headers: this.getHeaders(), withCredentials: true });
  }

  public delete(url: string): Observable<any> {
    return this.http.delete<any>(url, { headers: this.getHeaders(), withCredentials: true });
  }
}
