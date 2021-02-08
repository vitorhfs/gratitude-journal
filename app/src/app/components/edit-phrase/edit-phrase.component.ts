import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhraseSingle } from '../../models/phrases.model';
import { PhrasesService } from '../../service/phrases.service';
import { FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-phrase',
  templateUrl: './edit-phrase.component.html',
  styleUrls: ['./edit-phrase.component.scss'],
})
export class EditPhraseComponent implements OnInit {
  phrase: PhraseSingle;
  name: FormControl;

  constructor(
    public phrasesService: PhrasesService,
    public route: ActivatedRoute,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.getPhrase();    
  }

  getPhrase(){
    const id = this.route.snapshot.paramMap.get('id')!;
    this.phrasesService.getPhrasesList()
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
