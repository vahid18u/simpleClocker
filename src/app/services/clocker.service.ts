import { Injectable } from '@angular/core';
import * as moment from 'moment-jalaali';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export enum ClockType {
  In = "In",
  Out = "Out"
}
export interface IClock {
  uuid: string,
  timestamp: number,
  clockType: ClockType
}

@Injectable({
  providedIn: 'root'
})
export class ClockerService {
  clockList: IClock[] = [];
  clockStatus: ClockType | null = null;
  // define observables
  private newClockSource = new Subject<IClock>();
  newClock$ = this.newClockSource.asObservable();
  // clock status changes
  private clockStatusChangedSource = new Subject<ClockType | null>();
  clockStatusChanged$ = this.clockStatusChangedSource.asObservable();


  async getTodayClocks(): Promise<IClock[]> {
    const todayClocks: IClock[] = [];
    this.clockList.forEach(clockListItem => {
      if (this.isToday(clockListItem.timestamp)) {
        todayClocks.push(clockListItem);
      }
    });
    return todayClocks;
  }
  private isToday(date: number): boolean { return moment(0, "HH").diff(date, "days") == 0 };
  getClockStatus(): ClockType | null {
    return this.clockStatus;
  }
  async clockIn(): Promise<void> {
    if (this.clockStatus === ClockType.In) {
      throw "You are already In";
    }
    const m = moment();
    const newClock: IClock = {
      uuid: uuidv4(),
      clockType: ClockType.In,
      timestamp: m.unix() * 1000,
    }
    this.clockList.push(newClock);
    this.clockStatus = newClock.clockType;
    this.clockStatusChangedSource.next(this.clockStatus);
    this.newClockSource.next(newClock);
  }
  async clockOut(): Promise<void> {
    if (this.clockStatus === ClockType.Out) {
      throw "You are already Out";
    }
    const m = moment();
    const newClock: IClock = {
      uuid: uuidv4(),
      clockType: ClockType.Out,
      timestamp: m.unix() * 1000,
    }
    this.clockList.push(newClock);
    this.clockStatus = newClock.clockType;
    this.clockStatusChangedSource.next(this.clockStatus)
    this.newClockSource.next(newClock);

  }

  constructor() {
  }
}
