import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { PhrasesList } from '../models/PhrasesList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {
  readonly url: string;
  userId: string;

  constructor(public http: HttpClient, private userService: UserService) { 
    this.url = `http://localhost:3333`;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUserId(){
    this.userService.getUser('56dc33ec-0d9c-49c5-8f72-a1470556503b')
    .subscribe(user => this.userId = user.user.id)
  }

  getPhrasesList(): Observable<PhrasesList>{
    const id = this.getUserId();

    return this.http.get<PhrasesList>(`${this.url}/phrases/${id}`);
  }
}
