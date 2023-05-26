import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { TabContainerComponent } from './components/tab-container/tab-container.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
  {
    path: '',
    component: TabContainerComponent,
    children: [
      { path: 'today', component: TodayComponent },
      { path: 'history', component: HistoryComponent },
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
