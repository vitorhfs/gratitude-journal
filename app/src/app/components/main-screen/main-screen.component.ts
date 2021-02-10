import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { PhrasesService } from '../../service/phrases.service';
import { UserService } from '../../service/user.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { PhraseSingle } from 'src/app/models/phrases.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  user$: User;
  phrases$: PhraseSingle[];
  currentPhraseId: string;
  text = new FormControl('');
  
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

  ionViewDidEnter(){
    
  }

  getUser(){
    this.auth.user$.subscribe(data => {
      if(data.sub){
        this.userService.getUser(data.sub)
        .subscribe(user => {
          this.user$ = user;                      
          this.getPhrases();       
        });
      }
    })
  }

  getPhrases() {    
    this.phrasesService.getPhrasesList(this.user$.userId)
    .subscribe(phrases => {      
      this.phrases$ = phrases.phrasesList.sort((a, b) => +b.date - +a.date);
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
    .subscribe(_item => {
      this.getPhrases();
    })
  }

  checkPhraseInput(list: PhraseSingle[]){  
    if(list === [] || undefined){
      return true;
    }

    if(list[0]){
      const regex = /\d{4}\-\d{2}\-\d{2}/;
      const date = new Date(+list[0].date)
      .toISOString().match(regex);
      const dateNow = new Date(Date.now()).toISOString().match(regex);    
      
      return date[0] === dateNow[0] ? false : true;
    }

    return true;
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
