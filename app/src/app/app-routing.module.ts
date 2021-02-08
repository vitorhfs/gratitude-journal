import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { EditPhraseComponent } from './components/edit-phrase/edit-phrase.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
  {
    path: 'home',
    component: AuthenticationButtonComponent
  },
  {
    path: 'detail/:id',
    component: EditPhraseComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
