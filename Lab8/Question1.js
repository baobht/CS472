class Meditation {
  mins;
  constructor(mins) {
    this.mins = mins;
  }
  start() {
    let timer = setInterval(() => {
      if (this.mins === 0) {
        clearInterval(timer);
        console.log("Jay Guru Dev");
        return;
      }
      console.log(this.mins);
      this.mins--;
    });
    return Promise.resolve(undefined);
  }
}
const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);
// Start meditation
// 5
// 4
// 3
// 2
// 1
// Jay Guru Dev
