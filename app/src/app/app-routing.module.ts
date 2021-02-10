import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { EditPhraseComponent } from './components/edit-phrase/edit-phrase.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationButtonComponent,
  },
  {
    path: 'detail/:id',
    component: EditPhraseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: MainScreenComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
