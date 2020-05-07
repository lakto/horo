import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ld-horo',
  template: `
    <div class="clock">
      <span class="hours" #hours>{{hoursStr}}</span>
      <span class="minutes" #minutes>{{minutesStr}}</span>
      <span class="seconds" #seconds>{{secondsStr}}</span>
    </div>
  `,
  styleUrls: ['./horo.component.scss']
})
export class HoroComponent implements AfterViewInit {

  @ViewChild('hours') hoursEle: ElementRef;
  hoursSize: number;
  hoursStr: string;

  @ViewChild('minutes') minutesEle: ElementRef;
  minutesSize: number;
  minutesStr: string;

  @ViewChild('seconds') secondsEle: ElementRef;
  secondsSize: number;
  secondsStr: string;

  constructor() { }

  ngAfterViewInit(): void {
    this.hoursSize = this.hoursEle.nativeElement.offsetWidth;
    this.minutesSize = this.minutesEle.nativeElement.offsetWidth;
    this.secondsSize = this.secondsEle.nativeElement.offsetWidth;

    setInterval(() => {
      const hours: number = new Date().getHours();
      this.hoursStr = ('0' + hours).slice(-2);

      const minutes: number = new Date().getMinutes();
      let minutesDeg: number;
      let minutesPos: number;

      const seconds: number = new Date().getSeconds();
      let secondsDeg: number;
      let secondsPos: number;

      minutesDeg = minutes * 6 + 270;
      minutesPos = Math.round(this.hoursSize / 2 + this.minutesSize / 2);
      this.minutesStr = ('0' + minutes).slice(-2);
      this.minutesEle.nativeElement.style.transform = 'rotate(' + minutesDeg + 'deg) ' +
        'translate(' + minutesPos + 'px) ' +
        'rotate(-' + minutesDeg + 'deg)';

      secondsDeg = seconds * 6 + 270;
      secondsPos = Math.round(this.hoursSize / 2 + this.secondsSize / 2);
      this.secondsStr = ('0' + seconds).slice(-2);
      this.secondsEle.nativeElement.style.transform = 'rotate(' + secondsDeg + 'deg) ' +
        'translate(' + secondsPos + 'px) ' +
        'rotate(-' + secondsDeg + 'deg)';

    }, 1000);
  }

}
