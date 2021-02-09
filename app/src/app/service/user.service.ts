import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProm } from '../models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url: string;
  userId: string;

  private handleError<T>(result?: T){
    return (_error: any): Observable<T> => {
      return of(result as T);
    }
  }

  constructor(public http: HttpClient) { 
    this.url = `https://backendbasic.herokuapp.com/users/`;
  }

  postUser(auth: string, name: string): Observable<{}>{
    return this.http.post(`${this.url}`, {
      name: name,
      auth: auth
    }).pipe(
      catchError(this.handleError({}))
    );
  }

  getUser(auth: string): Observable<{userId: string; username: string} | {}>{
    return this.http.get<{userId: string; username: string} | {}>(`${this.url}${auth}`)
      .pipe(
        catchError(this.handleError({}))
      );
  }
}