import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PhrasesList } from '../models/phrases.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {
  readonly url: string;

  constructor(
    public http: HttpClient, 
  ) { 
    this.url = `https://backendbasic.herokuapp.com/phrases/`;    
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPhrasesList(userId: string): Observable<PhrasesList>{      
    return this.http.get<PhrasesList>(`${this.url}${userId}`)
      .pipe(
        map((res: any) => {
          if(!res.phrasesList){
            return [];
          }
          return res;
        }),
        catchError(_error => of([]))
      );
  }

  postPhrase(userId: string, content: string){
    return this.http.post(`${this.url}${userId}`, {
      content: content
    }, this.httpOptions)
    .pipe(
      catchError(_error => of([]))
    )
  }

  editPhrase(phraseId: string, content: string): Observable<{}>{
    return this.http.put(`${this.url}${phraseId}`, {
      content: content
    }, this.httpOptions).pipe(
      catchError(_error => of({}))
    )
  }

  deletePhrase(phraseId: string): Observable<{}>{
    return this.http.delete(`${this.url}${phraseId}`)
      .pipe(
        catchError(_error => of({}))
        )
  }
}
