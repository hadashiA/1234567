export default class Cell {
  constructor() {
    this.on         = false;
    this.neighbours = [];
  }

  get off() {
    return !this.on;
  }

  nextTick() {
  }
};

