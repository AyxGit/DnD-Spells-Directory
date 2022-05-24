import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import { SpellListComponent } from './components/spell-list/spell-list.component';

const routes: Routes = [

  { path: '', component: SpellListComponent },
  { path: ':spellcard', component: SpellListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
