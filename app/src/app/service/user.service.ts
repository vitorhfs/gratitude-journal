import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url: string;
  user: User;
  
  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) { 
    this.url = `https://backendbasic.herokuapp.com/users/`;
  }
  
  private handleError<T>(result?: T){
    return (_error: any): Observable<T> => {
      return of(result as T);
    }
  }

  postUser(auth: string, name: string): Observable<any>{
    return this.http.post(`${this.url}`, {
      name: name,
      auth: this.convertAuth(auth)
    }).pipe(
      catchError(this.handleError({}))
    );
  }

  getUser(auth: string): Observable<User>{ 
    return this.http.get<User>(`${this.url}${this.convertAuth(auth)}`).pipe(
      tap(
        data => this.user = data
      )
    );
  }

  convertAuth(auth: string): string{
    const splitArray = auth.split('|');

    return splitArray[1];
  }
}