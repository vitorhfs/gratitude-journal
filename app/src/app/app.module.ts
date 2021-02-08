import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthModule } from '@auth0/auth0-angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { EditPhraseComponent } from './components/edit-phrase/edit-phrase.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment as env} from '../environments/environment';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    EditPhraseComponent,
    AuthenticationButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    CommonModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      ...env.auth
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: env.production })
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
