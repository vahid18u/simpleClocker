import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment-jalaali';
import { Subscription } from 'rxjs';
import { ClocksTodayViewModel } from '../../today/today.component';
import { ClockerService } from '../../services/clocker.service';


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
      console.log(moment(clock.timestamp).format('HH:mm:ss'));
      this.clocks.items.splice(0, 0, {
        uuid: clock.clockType,
        clockType: clock.clockType,
        timeStamp: clock.timestamp,
        hrTime: moment(clock.timestamp).format('HH:mm:ss')
      });
    })
  }
  ngOnDestroy(): void {
    this.newClockSubscription?.unsubscribe();
  }

}
