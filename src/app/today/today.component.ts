import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClockType, ClockerService } from '../services/clocker.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment-jalaali';

export interface ClocksTodayViewModel {
  items: {
    uuid: string,
    timeStamp: number,
    hrTime: string,
    clockType: ClockType;
  }[]

}

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit, OnDestroy {
  ClockType = ClockType;
  clockStatus: ClockType | null = null;


  isToastOpen = false;
  toastColor: "danger" | "success" | "warning" | undefined = undefined
  clockStatusChangedSubscription?: Subscription;
  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  toastMessage: string = "";
  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
  todayDate: string = ""
  constructor(private clockerService: ClockerService) {

  }
  ngOnDestroy(): void {
    this.clockStatusChangedSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.todayDate = moment().format("jD jMMMM jYYYY");
    this.clockStatusChangedSubscription = this.clockerService.clockStatusChanged$.subscribe(newStatus => {
      this.clockStatus = newStatus;
    })
  }

  async clockIn() {
    await this.clockerService.clockIn().catch((err: string) => {
      this.toastMessage = err;
      this.toastColor = "warning";
      this.setToastOpen(true);

    });
  }
  async clockOut() {
    await this.clockerService.clockOut().catch((err: string) => {
      this.toastMessage = err;
      this.toastColor = "warning";
      this.setToastOpen(true);
    });
  }



}
