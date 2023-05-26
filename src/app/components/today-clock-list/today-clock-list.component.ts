import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment-jalaali';
import { Subscription } from 'rxjs';
import { ClockerService } from 'src/app/services/clocker.service';
import { ClocksTodayViewModel } from 'src/app/today/today.component';

@Component({
  selector: 'app-today-clock-list',
  templateUrl: './today-clock-list.component.html',
  styleUrls: ['./today-clock-list.component.scss'],
})
export class TodayClockListComponent implements OnInit, OnDestroy {
  clocks: ClocksTodayViewModel = {
    items: []
  }
  newClockSubscription?: Subscription;
  constructor(private clockerService: ClockerService) {
  }


  ngOnInit() {
    this.newClockSubscription = this.clockerService.newClock$.subscribe(clock => {
      console.log(clock);
      console.log(moment(clock.timestamp).format('HH:mm'));
      this.clocks.items.splice(0, 0, {
        uuid: clock.clockType,
        clockType: clock.clockType,
        timeStamp: clock.timestamp,
        hrTime: moment(clock.timestamp).format('HH:mm')
      });
    })
  }
  ngOnDestroy(): void {
    this.newClockSubscription?.unsubscribe();
  }

}
