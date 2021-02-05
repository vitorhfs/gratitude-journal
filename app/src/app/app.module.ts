import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { EditPhraseComponent } from './edit-phrase/edit-phrase.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    EditPhraseComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    CommonModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: 
    RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
  }],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
