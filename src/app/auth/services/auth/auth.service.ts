import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const BASIC_URL = "https://focused-delight-production.up.railway.app/";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(sigunupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/signup", sigunupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + "api/auth/login", loginRequest);
  }
}
