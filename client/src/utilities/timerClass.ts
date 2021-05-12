export default class timerClass {
  myTimer: any;
  timerLimit: number;
  timerIncrement: number;
  time: number;

  constructor(limit: number, increment: number) {
    this.timerLimit = limit;
    this.timerIncrement = increment;
    this.time = 0;
  }

  myClock(): void {
    if (this.time === this.timerLimit) {
      clearInterval(this.myTimer);
    }
  }
  start(): void {
    this.myTimer = setInterval(this.myClock, this.timerIncrement);
  }

  end(): void {
    clearInterval(this.myTimer);
  }

  getTime(): number {
    return this.time;
  }
}
