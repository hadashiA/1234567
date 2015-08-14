export default class Cell {
  constructor() {
    this.on = (Math.random() > 0.5);
    this.neighbours = [];
  }

  get off() {
    return !this.on;
  }

  nextTick() {
    let liveCount = 0;
    for (let cell of this.neighbours) {
      if (cell.on) {
        liveCount++;
      }
    }

    if (this.on) {
      this.on = (liveCount == 2 || liveCount == 3);
    } else {
      this.on = (liveCount == 3);
    }
  }
};

