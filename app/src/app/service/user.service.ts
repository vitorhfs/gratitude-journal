import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProm } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url: string;
  userId: string = `56dc33ec-0d9c-49c5-8f72-a1470556503b`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { 
    this.url = `http://localhost:3333`;
  }

  //later to be added a google auth that will store in cache to validate the user and then the API respond with the client ID
  getUser(loginId: string): Observable<UserProm>{
    return this.http.get<UserProm>(`${this.url}/users/${loginId}`);
  }
}