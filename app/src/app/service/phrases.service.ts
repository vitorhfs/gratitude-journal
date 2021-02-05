import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { PhrasesList } from '../models/phrases.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {
  readonly url: string;

  constructor(public http: HttpClient, private userService: UserService) { 
    this.url = `http://localhost:3333/phrases/`;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(result?: T){
    return (_error: any): Observable<T> => {
      return of(result as T);
    }
  }

  getPhrasesList(): Observable<PhrasesList>{    
    return this.http.get<PhrasesList>(`${this.url}${this.userService.userId}`)
      .pipe(
        catchError(this.handleError<PhrasesList>({
          phrasesList: []
        }))
      );
  }

  deletePhrase(phraseId: string): Observable<{}>{
    return this.http.delete(`${this.url}${phraseId}`)
      .pipe(
        catchError(this.handleError({}))
      )
  }
}
