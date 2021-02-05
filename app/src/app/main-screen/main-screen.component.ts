import { Component, OnInit } from '@angular/core';
import { PhrasesList } from '../models/phrases.model';
import { UserObj } from '../models/user.model';
import { PhrasesService } from '../service/phrases.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  user$: UserObj;
  phrases$: {
    id: string;
    content: string;
    date: string;
  }[];

  constructor(
    public phrasesService: PhrasesService, 
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getPhrases();
  }

  getUsers() {
    this.userService.getUser(this.userService.userId)
    .subscribe(user => this.user$ = user.user);
  }

  getPhrases() {
    this.phrasesService.getPhrasesList()
    .subscribe(phrases => {
      this.phrases$ = phrases.phrasesList;
    });
  }
}
