import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditPhraseComponent } from './edit-phrase/edit-phrase.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainScreenComponent
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
