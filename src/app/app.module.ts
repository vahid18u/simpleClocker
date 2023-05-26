import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { TodayComponent } from './today/today.component';
import { FormsModule } from '@angular/forms';
import { TabContainerComponent } from './components/tab-container/tab-container.component';
import { TodayClockListComponent } from './components/today-clock-list/today-clock-list.component';

@NgModule({
  declarations: [AppComponent, HistoryComponent, TodayComponent, TabContainerComponent, TodayClockListComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
