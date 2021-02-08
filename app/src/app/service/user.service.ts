import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProm } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url: string;
  userId: string = `39f3e6b2-041e-44e9-821f-1dc3444d2f57`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { 
    this.url = `https://backendbasic.herokuapp.com/users/`;
  }

  //later to be added a google auth that will store in cache to validate the user and then the API respond with the client ID
  getUser(loginId: string): Observable<UserProm>{
    return this.http.get<UserProm>(`${this.url}${loginId}`);
  }
}