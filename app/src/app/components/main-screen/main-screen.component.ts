import { Component, OnInit, ViewChild,  } from '@angular/core';
import { ActionSheetController, IonContent, IonList } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { PhrasesService } from '../../service/phrases.service';
import { UserService } from '../../service/user.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  user$: User;
  phrases$: {
    id: string;
    content: string;
    date: string;
  }[];
  currentPhraseId: string;
  newPhraseState: boolean = true;
  text = new FormControl('');
  phrasesTest = [
    {
      id: '123132',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '254234234',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '23423423',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '3576456',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '456456456',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '34684786',
      content: 'Texto maior pra testar o quanto fica legal na UI ainda, acho que até um pouco mais',
      date: new Date()
    },
    {
      id: '412512312',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '670584587345',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '47562352',
      content: 'Texto',
      date: new Date()
    },
    {
      id: '3124312',
      content: 'Texto',
      date: new Date()
    },
  ]

  constructor(
    public phrasesService: PhrasesService, 
    public userService: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public route: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getUser();     
  }

  getUser(){
    this.auth.user$.subscribe(data => {
      if(data.sub){
        console.log(data.sub)
        this.userService.getUser(data.sub)
        .subscribe(user => {
          this.user$ = user;
          this.getPhrases();
          this.checkPhraseInput();          
        });
      }
    })
  }

  getPhrases() {    
    this.phrasesService.getPhrasesList(this.user$.userId)
    .subscribe(phrases => {      
      if(this.phrases$){
        this.phrases$ = phrases.phrasesList.sort((a, b) => +b.date - +a.date);               
        this.checkPhraseInput();
      }
      this.phrases$ = phrases.phrasesList;
      this.checkPhraseInput();
    });
  }

  postPhrase() {
    if(!this.text.value) return;

    if(this.user$){
      this.phrasesService.postPhrase(this.user$.userId, this.text.value)
      .subscribe(_ => {
        this.text.setValue('');
        this.getPhrases();
      })
    }
  }

  deletePhrases(id: string){
    this.phrasesService.deletePhrase(id)
    .subscribe(item => {
      this.getPhrases();
    })
  }

  checkPhraseInput(){ 
    if(this.phrases$ === []){
      this.newPhraseState = true;
    }

    const regex = /\d{4}\-\d{2}\-\d{2}/;
    const date = new Date(+this.phrases$[this.phrases$.length - 1].date)
    .toISOString().match(regex);
    const dateNow = new Date(Date.now()).toISOString().match(regex);

    if (date[0] === dateNow[0]){
      this.newPhraseState = false;
    }
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: '',
      cssClass: 'actionsheet__phrase',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.alertConfirmDelete();
          }
        }, {
          text: 'Edit',
          handler: () => {
            this.route.navigate(['detail', this.currentPhraseId])
          }
        }, {
          text: 'Cancel',
          role: 'cancel',          
        }
      ]
    });    

    await actionSheet.present();
  }  

  async alertConfirmDelete(){
    const alert = await this.alertController.create({
      cssClass: 'alert__delete',
      header: 'Delete Phrase',
      message: 'Are you sure to delete this phrase?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.deletePhrases(this.currentPhraseId);                
          }
        }
      ]
    });

    await alert.present();
  }

}
