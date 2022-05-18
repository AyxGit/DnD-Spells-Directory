import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import { SpellListComponent } from './components/spell-list/spell-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TimesPipe } from './directives/times-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SpellCardComponent,
    SpellListComponent,
    LayoutComponent,
    TimesPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
