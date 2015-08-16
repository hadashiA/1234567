function gol() {
    let liveCount = 0;
    for (let cell of this.neighbours) {
      if (cell.on) {
        liveCount++;
      }
    }

    if (this.on) {
      return (liveCount == 2 || liveCount == 3);
    } else {
      return (liveCount == 3);
    }
}

function vishniac() {
  let liveCount = (this.on ? 1 : 0);
  for (let cell of this.neighbours) {
    if (cell.on) {
      liveCount++;
    }
  }

  let nextState = this.on;
  if (liveCount <= 4) {
    nextState = false;
  } else if (liveCount > 4) {
    nextState = true;
  }

  if (liveCount == 4 || liveCount == 5) {
    nextState = !nextState;
  }
  return nextState;
}

function brian() {
  switch (this.state) {
  case 0:
    let firingCount = 0;
    for (let cell of this.neighbours) {
      if (cell.state == 1) {
        firingCount++;
      }
    }
    if (firingCount == 2) {
      return 1;
    } else {
      return this.state;
    }
  case 1:
    return 2;
  default:
    return 0;
  }
}

export default class Cell {
  constructor(calculator) {
    this.state = Math.floor(Math.random() * 3);
    this.neighbours = [];
    this.calculator = (calculator || gol);
  }

  get on() {
    return this.state == 1;
  }

  get off() {
    return this.state == 2;
  }

  nextTick() {
    let state = this.calculator.call(this);
    if (state === true) {
      this.state = 1;
    } else if (state === false) {
      this.state = 2;
    } else {
      this.state = state;
    }
  }
};

Cell.gol = gol;
Cell.vishniac = vishniac;
Cell.brian = brian;

