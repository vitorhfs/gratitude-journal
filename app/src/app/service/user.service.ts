import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { 
    this.url = `http://localhost:3333`;
  }

  //later to be added a google auth that will stored in cache to validate the user and then the API respond with the client ID
  getUser(loginId: string): Observable<User>{
    return this.http.get<User>(`${this.url}/users/${loginId}`);
  }
}