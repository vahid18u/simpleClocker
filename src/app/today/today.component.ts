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
  isConfirmAlertOpen: boolean = false;
  confirmed: boolean = false;
  confirmMessage: string = '';
  private confirmHandler: () => void = () => { };
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
  confirmButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.confirmHandler();
      },
    },
  ];
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

  requestClockIn() {
    this.confirmHandler = this.clockIn;
    this.confirmMessage = "Clock In?"
    this.isConfirmAlertOpen = true;
  }
  requestClockOut() {
    this.confirmHandler = this.clockOut;
    this.confirmMessage = "Clock Out?"
    this.isConfirmAlertOpen = true;
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
  setConfirmOpen(open: boolean) {
    this.isConfirmAlertOpen = open;
  }



}
