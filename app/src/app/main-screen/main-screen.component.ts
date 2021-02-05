import { Component, OnInit,  } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
  currentPhraseId: string;

  constructor(
    public phrasesService: PhrasesService, 
    public userService: UserService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
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

  deletePhrases(id: string){
    this.phrasesService.deletePhrase(id)
    .subscribe(item => {
      console.log(item);
      this.getPhrases();
    })
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
            console.log('edit page');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('going back');            
          }
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
