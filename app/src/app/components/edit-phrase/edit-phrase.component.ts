import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhraseSingle } from '../../models/phrases.model';
import { PhrasesService } from '../../service/phrases.service';
import { FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-edit-phrase',
  templateUrl: './edit-phrase.component.html',
  styleUrls: ['./edit-phrase.component.scss'],
})
export class EditPhraseComponent implements OnInit {
  phrase: PhraseSingle;
  name: FormControl;
  userId: string;

  constructor(
    public phrasesService: PhrasesService,
    public userService: UserService,
    public route: ActivatedRoute,
    public alertController: AlertController,
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getData();  
  }

  getData(){
    this.auth.user$.subscribe(data => {
      if(data.sub){
        this.userService.getUser(data.sub)
        .subscribe(user => {
          if(user.userId){
            this.getPhrase(user.userId)
          }
        });
      }
    })
  }

  getPhrase(userId: string){
    const id = this.route.snapshot.paramMap.get('id')!;    
    this.phrasesService.getPhrasesList(userId)
    .subscribe(item => {
      this.phrase = item.phrasesList.find(item => item.id === id);
      this.name = new FormControl(this.phrase.content)
    })
  }

  async confirm(){
    const alert = await this.alertController.create({
      cssClass: 'alert__editing',
      header: 'Confirm Editing',
      message: 'Are you sure about your changes?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.save();
          }
        }
      ]
    });

    await alert.present();
  }

  save(){
    if (!this.phrase) return;
    
    this.phrasesService.editPhrase(this.phrase.id, this.name.value)
    .subscribe(_item => this.router.navigate(['home']));    
  }
}
